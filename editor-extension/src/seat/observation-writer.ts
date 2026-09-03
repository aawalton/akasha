import { spawn, type ChildProcess } from 'node:child_process';
import { existsSync } from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import type { Readable } from 'node:stream';

/**
 * THE HOST END OF THE OBSERVATION WRITER. It hands a write over a pipe and waits; the walking, the
 * locking and the landing all happen in `observation-writer-main.ts`, in a process of its own.
 *
 * What the host thread spends per write is a `JSON.stringify` and a `write` into a pipe with room
 * in it. Everything that used to cost 202-430ms of unbroken synchronous block happens elsewhere.
 *
 * ONE CHILD PER WINDOW, started when the first write is asked for rather than at activation, so a
 * window that never records never pays a bun startup. It is the same shape the command server is held
 * open by, and a second bun process is what that already established the cost of.
 *
 * A CHILD THAT IS GONE REFUSES rather than hanging: everything waiting on it is told, and the next
 * ask starts another. The store leaves `writtenKey` alone when a write is refused, so the state
 * that did not land is written again by the next flush — and the pollers ask for one about once a
 * second, so a lost child costs a second of staleness rather than an observation.
 */

// How long a child may take to say hello. A bun startup and nothing else.
const START_TIMEOUT_MS = 15_000;

// How long one write may take before the child is treated as stuck. The write it is doing walks
// the checkout, which has been seen to take seconds under load, so this is generous rather than
// tuned; it is a bound on hanging, not on slowness.
const WRITE_TIMEOUT_MS = 60_000;

// How long a disposing host waits for the child to drain and exit before it stops waiting. The
// child writes what it already holds and goes; this is the bound on a child that will not.
const DRAIN_TIMEOUT_MS = 5_000;

const WRITER_MAIN = 'observation-writer-main.ts';

export interface WriterAsk {
	readonly act: string;
	readonly pageType: string;
	readonly name: string;
	readonly url: string;
	readonly method: string;
	readonly headers: Record<string, string>;
	readonly body: string;
}

export interface WriterAnswer {
	readonly ok: boolean;
	readonly status: number;
	readonly body: unknown;
	readonly saying?: string;
}

export interface WriterAt {
	readonly bun: string;
	readonly mainFile: string;
	readonly env: NodeJS.ProcessEnv;
	readonly onNoise?: (text: string) => void;
}

interface Waiting {
	readonly settle: (answer: WriterAnswer) => void;
	readonly refuse: (err: Error) => void;
	readonly timer: ReturnType<typeof setTimeout>;
}

interface Session {
	readonly child: ChildProcess;
	readonly waiting: Map<number, Waiting>;
	lost: boolean;
}

// WHERE THE CHILD'S ENTRY STANDS, ASKED OF THE CHECKOUT RATHER THAN OF THIS MODULE'S OWN PATH.
// This file is loaded from source by the extension host and from a single bundled file by the
// panel harness, and in the bundle `import.meta.url` names the bundle, beside which the child's
// entry does not stand. An absolute path built from the checkout root is the same answer under
// both, and the root is the one the rest of the extension already reaches akasha by.
export function writerMainIn(akashaRoot: string): string {
	return path.join(akashaRoot, 'editor-extension', 'src', 'seat', WRITER_MAIN);
}

export function bunIn(homeDirectory: string = os.homedir()): string {
	const directory = path.join(homeDirectory, '.bun', 'bin');
	if (!existsSync(path.join(directory, 'bun'))) {
		throw new Error(`bun is not installed in ${directory}, and the observation writer needs it`);
	}
	return path.join(directory, 'bun');
}

export class ObservationWriterClient {
	private readonly at: WriterAt;

	private session: Session | null = null;

	private starting: Promise<Session> | null = null;

	private nextId = 1;

	private disposed = false;

	constructor(at: WriterAt) {
		this.at = at;
	}

	async ask(ask: WriterAsk): Promise<WriterAnswer> {
		if (this.disposed) {
			throw new Error('the observation writer has been disposed and starts no child');
		}
		const session = await this.open();
		const id = this.nextId++;
		return new Promise<WriterAnswer>((settle, refuse) => {
			const timer = setTimeout(() => {
				session.waiting.delete(id);
				this.retire(session, 'SIGKILL');
				refuse(new Error(`the observation writer did not answer within ${WRITE_TIMEOUT_MS}ms`));
			}, WRITE_TIMEOUT_MS);
			timer.unref?.();
			session.waiting.set(id, { settle, refuse, timer });
			try {
				session.child.stdin?.write(`${JSON.stringify({ id, ...ask })}\n`);
			} catch (thrown) {
				clearTimeout(timer);
				session.waiting.delete(id);
				refuse(new Error(`the observation write could not be handed over: ${String(thrown)}`));
			}
		});
	}

	// THE HOST IS GOING AND THE CHILD IS TOLD SO BY ITS STDIN CLOSING, which is what makes it drain
	// what it holds and exit. This waits for that rather than killing it, because everything the
	// host handed over and has not seen answered is written during exactly that drain.
	async dispose(): Promise<void> {
		this.disposed = true;
		const session = this.session;
		if (session === null || session.lost) { return; }
		this.session = null;
		await new Promise<void>((done) => {
			const timer = setTimeout(() => {
				try { session.child.kill('SIGKILL'); } catch { /* already gone */ }
				done();
			}, DRAIN_TIMEOUT_MS);
			timer.unref?.();
			session.child.on('exit', () => { clearTimeout(timer); done(); });
			try { session.child.stdin?.end(); } catch { clearTimeout(timer); done(); }
		});
	}

	private async open(): Promise<Session> {
		const held = this.session;
		if (held !== null && !held.lost) { return held; }
		const already = this.starting;
		if (already !== null) { return already; }
		const starting = this.start();
		this.starting = starting;
		try {
			const session = await starting;
			this.session = session;
			return session;
		} finally {
			if (this.starting === starting) { this.starting = null; }
		}
	}

	private start(): Promise<Session> {
		return new Promise<Session>((ready, refuse) => {
			let child: ChildProcess;
			try {
				child = spawn(this.at.bun, [this.at.mainFile], {
					env: this.at.env,
					stdio: ['pipe', 'pipe', 'pipe', 'pipe'],
				});
			} catch (thrown) {
				refuse(new Error(`the observation writer could not be started: ${String(thrown)}`));
				return;
			}
			const protocol = child.stdio[3] as Readable | undefined;
			if (protocol === undefined || protocol === null) {
				child.kill('SIGKILL');
				refuse(new Error('the fourth pipe every answer comes back on was not opened'));
				return;
			}
			const session: Session = { child, waiting: new Map(), lost: false };
			let settled = false;
			const timer = setTimeout(() => {
				if (settled) { return; }
				settled = true;
				this.retire(session, 'SIGKILL');
				refuse(new Error(`the observation writer said no hello within ${START_TIMEOUT_MS}ms`));
			}, START_TIMEOUT_MS);
			timer.unref?.();

			const noise = (text: string): void => { this.at.onNoise?.(text); };
			child.stdout?.setEncoding('utf8');
			child.stdout?.on('data', (chunk: string) => noise(`stdout: ${chunk.trimEnd()}`));
			child.stderr?.setEncoding('utf8');
			child.stderr?.on('data', (chunk: string) => noise(`stderr: ${chunk.trimEnd()}`));
			child.on('error', (err) => {
				this.lose(session, `the observation writer could not be run: ${String(err)}`);
				if (!settled) { settled = true; clearTimeout(timer); refuse(new Error(String(err))); }
			});
			child.on('exit', (code, signal) => {
				this.lose(session, `the observation writer exited (code ${String(code)}, signal ${String(signal)})`);
				if (!settled) {
					settled = true;
					clearTimeout(timer);
					refuse(new Error(`it exited before saying hello (code ${String(code)})`));
				}
			});

			let held = '';
			protocol.setEncoding('utf8');
			protocol.on('data', (chunk: string) => {
				held += chunk;
				for (;;) {
					const cut = held.indexOf('\n');
					if (cut < 0) { break; }
					const line = held.slice(0, cut);
					held = held.slice(cut + 1);
					if (line.trim() === '') { continue; }
					const said = readLine(line);
					if (said === null) {
						noise(`a line on the answer pipe was not JSON and was thrown away: ${line.slice(0, 200)}`);
						continue;
					}
					if (typeof said['hello'] === 'number') {
						if (settled) { continue; }
						settled = true;
						clearTimeout(timer);
						ready(session);
						continue;
					}
					this.took(session, said);
				}
			});
		});
	}

	private took(session: Session, said: Record<string, unknown>): void {
		const id = said['id'];
		if (typeof id !== 'number') { return; }
		const held = session.waiting.get(id);
		if (held === undefined) { return; }
		session.waiting.delete(id);
		clearTimeout(held.timer);
		held.settle({
			ok: said['ok'] === true,
			status: typeof said['status'] === 'number' ? said['status'] : 500,
			body: said['body'] ?? null,
			...(typeof said['saying'] === 'string' ? { saying: said['saying'] } : {}),
		});
	}

	// A CHILD THAT IS GONE ANSWERS NOTHING. Everything still waiting on it is refused by name rather
	// than left hanging, so the store learns the write did not land and writes that state again.
	private lose(session: Session, saying: string): void {
		if (session.lost) { return; }
		session.lost = true;
		if (this.session === session) { this.session = null; }
		for (const [id, held] of [...session.waiting]) {
			session.waiting.delete(id);
			clearTimeout(held.timer);
			held.refuse(new Error(saying));
		}
	}

	private retire(session: Session, how: NodeJS.Signals): void {
		if (this.session === session) { this.session = null; }
		session.lost = true;
		try { session.child.stdin?.end(); } catch { /* already gone */ }
		try { session.child.kill(how); } catch { /* already gone */ }
	}
}

function readLine(line: string): Record<string, unknown> | null {
	try {
		const said: unknown = JSON.parse(line);
		return said === null || typeof said !== 'object' ? null : (said as Record<string, unknown>);
	} catch {
		return null;
	}
}

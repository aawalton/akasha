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

// WHERE THE CHILD'S ENTRY SITS, ASKED OF THE CHECKOUT RATHER THAN OF THIS MODULE'S OWN PATH.
// This file is loaded from source by the extension host and from a single bundled file by the
// panel harness, and in the bundle `import.meta.url` names the bundle, which the child's
// entry is not beside. An absolute path built from the checkout root is the same answer under
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

export type Writing = {
	readonly ask: (one: WriterAsk) => Promise<WriterAnswer>;
	readonly dispose: () => Promise<void>;
};

export function writingTo(at: WriterAt): Writing {
	// One set of these per call, held in this closure. Two writings share nothing — which is the
	// whole point of a window holding its own: a shared child would write every window's state into
	// whichever checkout it happened to be started with.
	let session: Session | null = null;
	let starting: Promise<Session> | null = null;
	let nextId = 1;
	let disposed = false;

	async function ask(one: WriterAsk): Promise<WriterAnswer> {
		if (disposed) {
			throw new Error('the observation writer has been disposed and starts no child');
		}
		// A CHILD ALREADY UP IS WRITTEN TO IN THIS TICK RATHER THAN A MICROTASK LATER. `dispose` does
		// everything it does synchronously, so an `await` here — even one that resolves at once —
		// puts the write after a `dispose` fired in the same tick, onto a stdin that has just been
		// ended. Node reports that as an `error` event on the socket rather than as a throw the
		// `try/catch` below could see, so the ask is neither answered nor refused. Written here, an
		// ask the host handed over before it began disposing is in the pipe before `dispose` closes
		// it, which is the drain this module promises.
		const held = session;
		if (held !== null && !held.lost) { return handOver(held, one); }

		const asking = await open();
		// DISPOSED WHILE THAT CHILD WAS STARTING. `dispose` ran in between, read a `session` that was
		// still null, and returned having ended nothing — so this child is one nobody is left to
		// close. Which of the two races this is: `dispose` takes the session it drains off `session`
		// and leaves null behind, so a session still standing there is one `dispose` never saw, and
		// retiring it here is the only chance it gets. This costs `dispose` no waiting — it has
		// already returned, and the child goes as soon as the start it was racing settles.
		if (disposed) {
			if (session === asking) { retire(asking, 'SIGKILL'); }
			throw new Error('the observation writer was disposed while this write was being handed over');
		}
		return handOver(asking, one);
	}

	// THE WRITE ITSELF, WHICH HAPPENS AS THIS IS CALLED and not when the promise it hands back is
	// awaited — a `new Promise` executor runs synchronously, and that is what keeps the write ahead
	// of whatever else the same tick has queued.
	function handOver(asking: Session, one: WriterAsk): Promise<WriterAnswer> {
		const id = nextId++;
		return new Promise<WriterAnswer>((settle, refuse) => {
			const timer = setTimeout(() => {
				asking.waiting.delete(id);
				retire(asking, 'SIGKILL');
				refuse(new Error(`the observation writer did not answer within ${WRITE_TIMEOUT_MS}ms`));
			}, WRITE_TIMEOUT_MS);
			timer.unref?.();
			asking.waiting.set(id, { settle, refuse, timer });
			try {
				asking.child.stdin?.write(`${JSON.stringify({ id, ...one })}\n`);
			} catch (thrown) {
				clearTimeout(timer);
				asking.waiting.delete(id);
				refuse(new Error(`the observation write could not be handed over: ${String(thrown)}`));
			}
		});
	}

	// THE HOST IS GOING AND THE CHILD IS TOLD SO BY ITS STDIN CLOSING, which is what makes it drain
	// what it holds and exit. This waits for that rather than killing it, because everything the
	// host handed over and has not seen answered is written during exactly that drain.
	async function dispose(): Promise<void> {
		disposed = true;
		const going = session;
		if (going === null || going.lost) { return; }
		session = null;
		await new Promise<void>((done) => {
			const timer = setTimeout(() => {
				try { going.child.kill('SIGKILL'); } catch { /* already gone */ }
				done();
			}, DRAIN_TIMEOUT_MS);
			timer.unref?.();
			going.child.on('exit', () => { clearTimeout(timer); done(); });
			try { going.child.stdin?.end(); } catch { clearTimeout(timer); done(); }
		});
	}

	async function open(): Promise<Session> {
		const held = session;
		if (held !== null && !held.lost) { return held; }
		const already = starting;
		if (already !== null) { return already; }
		const began = start();
		starting = began;
		try {
			const opened = await began;
			session = opened;
			return opened;
		} finally {
			if (starting === began) { starting = null; }
		}
	}

	function start(): Promise<Session> {
		return new Promise<Session>((ready, refuse) => {
			let child: ChildProcess;
			try {
				child = spawn(at.bun, [at.mainFile], {
					env: at.env,
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
			const fresh: Session = { child, waiting: new Map(), lost: false };
			let settled = false;
			const timer = setTimeout(() => {
				if (settled) { return; }
				settled = true;
				retire(fresh, 'SIGKILL');
				refuse(new Error(`the observation writer said no hello within ${START_TIMEOUT_MS}ms`));
			}, START_TIMEOUT_MS);
			timer.unref?.();

			const noise = (text: string): undefined => { at.onNoise?.(text); return undefined; };
			child.stdout?.setEncoding('utf8');
			child.stdout?.on('data', (chunk: string) => noise(`stdout: ${chunk.trimEnd()}`));
			child.stderr?.setEncoding('utf8');
			child.stderr?.on('data', (chunk: string) => noise(`stderr: ${chunk.trimEnd()}`));
			// A WRITE ONTO A PIPE THE CHILD NO LONGER HOLDS IS REPORTED HERE AND NOWHERE ELSE. An
			// EPIPE arrives as an `error` event on this stream rather than as a throw from `write`,
			// and an `error` event with no listener on it is rethrown by node — so without this a
			// child that merely died between the check and the write takes the extension host down
			// with it. Refusing by name is what the rest of this module does with a child that is
			// gone. It does not kill: `dispose` ends this same stdin on its way out, and the drain
			// that follows is the whole point of doing it that way.
			child.stdin?.on('error', (err) => {
				lose(fresh, `the observation writer could not be written to: ${String(err)}`);
			});
			child.on('error', (err) => {
				lose(fresh, `the observation writer could not be run: ${String(err)}`);
				if (!settled) { settled = true; clearTimeout(timer); refuse(new Error(String(err))); }
			});
			child.on('exit', (code, signal) => {
				lose(fresh, `the observation writer exited (code ${String(code)}, signal ${String(signal)})`);
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
						ready(fresh);
						continue;
					}
					took(fresh, said);
				}
			});
		});
	}

	function took(one: Session, said: Record<string, unknown>): undefined {
		const id = said['id'];
		if (typeof id !== 'number') { return undefined; }
		const held = one.waiting.get(id);
		if (held === undefined) { return undefined; }
		one.waiting.delete(id);
		clearTimeout(held.timer);
		held.settle({
			ok: said['ok'] === true,
			status: typeof said['status'] === 'number' ? said['status'] : 500,
			body: said['body'] ?? null,
			...(typeof said['saying'] === 'string' ? { saying: said['saying'] } : {}),
		});
		return undefined;
	}

	// A CHILD THAT IS GONE ANSWERS NOTHING. Everything still waiting on it is refused by name rather
	// than left hanging, so the store learns the write did not land and writes that state again.
	function lose(one: Session, saying: string): undefined {
		if (one.lost) { return undefined; }
		one.lost = true;
		if (session === one) { session = null; }
		for (const [id, held] of [...one.waiting]) {
			one.waiting.delete(id);
			clearTimeout(held.timer);
			held.refuse(new Error(saying));
		}
		return undefined;
	}

	function retire(one: Session, how: NodeJS.Signals): undefined {
		if (session === one) { session = null; }
		one.lost = true;
		try { one.child.stdin?.end(); } catch { /* already gone */ }
		try { one.child.kill(how); } catch { /* already gone */ }
		return undefined;
	}

	return { ask, dispose };
}

function readLine(line: string): Record<string, unknown> | null {
	try {
		const said: unknown = JSON.parse(line);
		return said === null || typeof said !== 'object' ? null : (said as Record<string, unknown>);
	} catch {
		return null;
	}
}

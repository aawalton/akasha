import { spawn, type ChildProcess } from 'node:child_process';
import type { Readable } from 'node:stream';

// THE NODE END OF THE VERB SERVER. Every reach into akasha from this host used to be a fresh bun
// child, and a bun child costs about 0.19s of wall and 0.22s of CPU before it has read a byte,
// whatever it was asked. A panel polling once a second paid that once a second for work that takes
// five milliseconds. This holds one bun process open and asks it over pipes.
//
// It caches no answer. Every ask re-runs the verb over there, so what comes back is composed from
// the files as they stand, exactly as a fresh child composed it. What this end guards instead is
// that the process answering is young enough to be trusted, and that a process which is gone
// refuses rather than repeating the last thing it said.

export const REFUSAL_LEASE = 'lease';

export const REFUSAL_GONE = 'gone';

export const REFUSAL_OVER_LEASE = 'over-lease';

export const REFUSAL_HUNG = 'hung';

export const REFUSAL_START = 'start';

export const REFUSAL_DISPOSED = 'disposed';

// The refusals that mean *this* server is finished rather than that the answer is unavailable. A
// caller meeting one starts another server and asks again, once. `over-lease` is not among them:
// it means the server answered past a bound it was holding itself to, which is a fault to surface
// rather than to paper over with a second try.
const START_ANOTHER: ReadonlySet<string> = new Set([REFUSAL_LEASE, REFUSAL_GONE]);

export class VerbServerRefusal extends Error {
	readonly refusal: string;

	constructor(refusal: string, message: string) {
		super(message);
		this.name = 'VerbServerRefusal';
		this.refusal = refusal;
	}
}

export interface ServedAnswer {
	readonly stdout: string;
	readonly stderr: string;
	readonly code: number;
	// How old the server was when it began composing this, and which process it was. The bound
	// below is checked against the first; the second is what says whether two answers came from
	// the same held-open runtime.
	readonly ageMs: number;
	readonly pid: number;
}

export interface VerbServerAt {
	readonly bun: string;
	readonly serverFile: string;
	readonly env: NodeJS.ProcessEnv;
	readonly startTimeoutMs: number;
	// The oldest a server may be, in this end's own reckoning, when it begins composing an answer.
	// Left out, the bound is whatever the server states it holds itself to, and the two ends then
	// check the same number independently. Named, this end holds the tighter one.
	readonly leaseBoundMs?: number;
	// Whatever a verb wrote to stdout or stderr over there and this end did not ask for. It can
	// never be an answer — answers come back on their own pipe — so it is only ever worth logging.
	readonly onNoise?: (text: string) => void;
}

interface Waiting {
	readonly settle: (answer: ServedAnswer) => void;
	readonly refuse: (err: Error) => void;
	readonly timer: ReturnType<typeof setTimeout>;
}

interface Session {
	readonly child: ChildProcess;
	readonly waiting: Map<number, Waiting>;
	// Filled from the hello and not before, which is why the client waits for one: the bound this
	// end holds an answer to is the server's own, read from the server.
	leaseMs: number;
	lost: boolean;
}

function refusalOf(refusal: string, saying: string): VerbServerRefusal {
	return new VerbServerRefusal(refusal, `the verb server refuses (${refusal}): ${saying}`);
}

export class VerbServerClient {
	private readonly at: VerbServerAt;

	private session: Session | null = null;

	private starting: Promise<Session> | null = null;

	private nextId = 1;

	private disposed = false;

	constructor(at: VerbServerAt) {
		this.at = at;
	}

	// EVERY ANSWER GOES THROUGH HERE, and it either answers or throws. There is no third road on
	// which a remembered answer comes back: this class holds no answer to remember.
	async ask(verb: string, args: readonly string[], timeoutMs: number): Promise<ServedAnswer> {
		const session = await this.open();
		const id = this.nextId++;
		const answer = await new Promise<ServedAnswer>((settle, refuse) => {
			const timer = setTimeout(() => {
				session.waiting.delete(id);
				// A server that has stopped answering must not be asked again: it is killed here so
				// the next ask starts a fresh one rather than queueing behind whatever is stuck.
				this.retire(session, 'SIGKILL');
				refuse(
					refusalOf(
						REFUSAL_HUNG,
						`${verb} was not answered within ${timeoutMs}ms, so the server was killed`
					)
				);
			}, timeoutMs);
			session.waiting.set(id, { settle, refuse, timer });
			try {
				session.child.stdin?.write(`${JSON.stringify({ id, verb, args: [...args] })}\n`);
			} catch (thrown) {
				clearTimeout(timer);
				session.waiting.delete(id);
				refuse(refusalOf(REFUSAL_GONE, `the ask could not be written: ${String(thrown)}`));
			}
		});
		const bound = this.at.leaseBoundMs ?? session.leaseMs;
		if (answer.ageMs > bound) {
			// The server was to have refused this itself. It did not, so this end does — an answer
			// composed by a process older than the bound is exactly the stale answer the bound is
			// for, and returning it would be the failure that looks like a success.
			this.retire(session, 'SIGTERM');
			throw refusalOf(
				REFUSAL_OVER_LEASE,
				`${verb} was answered by a server ${answer.ageMs}ms old, past its bound of ${bound}ms`
			);
		}
		return answer;
	}

	dispose(): void {
		this.disposed = true;
		if (this.session !== null) { this.retire(this.session, 'SIGTERM'); }
	}

	private async open(): Promise<Session> {
		if (this.disposed) {
			throw refusalOf(REFUSAL_DISPOSED, 'this client has been disposed and starts no server');
		}
		const held = this.session;
		if (held !== null && !held.lost) { return held; }
		const already = this.starting;
		if (already !== null) { return already; }
		// One start, however many asks arrive while it is happening: they all wait on this promise
		// rather than each spawning a server of its own.
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
				child = spawn(this.at.bun, [this.at.serverFile], {
					env: this.at.env,
					stdio: ['pipe', 'pipe', 'pipe', 'pipe'],
				});
			} catch (thrown) {
				refuse(refusalOf(REFUSAL_START, `bun could not be started: ${String(thrown)}`));
				return;
			}
			const protocol = child.stdio[3] as Readable | undefined;
			if (protocol === undefined || protocol === null) {
				child.kill('SIGKILL');
				refuse(refusalOf(REFUSAL_START, 'the fourth pipe every answer comes back on was not opened'));
				return;
			}
			const session: Session = { child, waiting: new Map(), leaseMs: 0, lost: false };
			let settled = false;
			const timer = setTimeout(() => {
				if (settled) { return; }
				settled = true;
				this.retire(session, 'SIGKILL');
				refuse(
					refusalOf(REFUSAL_START, `no hello arrived within ${this.at.startTimeoutMs}ms`)
				);
			}, this.at.startTimeoutMs);

			const noise = (text: string): void => { this.at.onNoise?.(text); };
			child.stdout?.setEncoding('utf8');
			child.stdout?.on('data', (chunk: string) => noise(`stdout: ${chunk}`));
			child.stderr?.setEncoding('utf8');
			child.stderr?.on('data', (chunk: string) => noise(`stderr: ${chunk}`));
			child.on('error', (err) => {
				this.lose(session, `the verb server could not be run: ${String(err)}`);
				if (!settled) { settled = true; clearTimeout(timer); refuse(refusalOf(REFUSAL_START, String(err))); }
			});
			child.on('exit', (code, signal) => {
				this.lose(session, `the verb server exited (code ${String(code)}, signal ${String(signal)})`);
				if (!settled) {
					settled = true;
					clearTimeout(timer);
					refuse(refusalOf(REFUSAL_START, `it exited before saying hello (code ${String(code)})`));
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
						session.leaseMs = typeof said['leaseMs'] === 'number' ? said['leaseMs'] : 0;
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
		if (said['ok'] !== true) {
			const refusal = typeof said['refusal'] === 'string' ? said['refusal'] : 'refused';
			const saying = typeof said['saying'] === 'string' ? said['saying'] : JSON.stringify(said);
			// A server saying its lease is up has said it will answer nothing more, and is exiting
			// behind the refusal. Letting go of it here rather than waiting to watch it die is what
			// makes the retry above land on a new server instead of writing into a closing pipe.
			if (refusal === REFUSAL_LEASE) { this.retire(session, 'SIGTERM'); }
			held.refuse(refusalOf(refusal, saying));
			return;
		}
		held.settle({
			stdout: typeof said['stdout'] === 'string' ? said['stdout'] : '',
			stderr: typeof said['stderr'] === 'string' ? said['stderr'] : '',
			code: typeof said['code'] === 'number' ? said['code'] : 0,
			// An answer that names no age is treated as older than any bound, so a server that has
			// stopped saying how old it is is refused rather than believed.
			ageMs: typeof said['ageMs'] === 'number' ? said['ageMs'] : Number.POSITIVE_INFINITY,
			pid: typeof said['pid'] === 'number' ? said['pid'] : 0,
		});
	}

	// A SERVER THAT IS GONE ANSWERS NOTHING. Everything still waiting on it is refused by name,
	// rather than left hanging or handed whatever was last read.
	private lose(session: Session, saying: string): void {
		if (session.lost) { return; }
		session.lost = true;
		if (this.session === session) { this.session = null; }
		for (const [id, held] of [...session.waiting]) {
			session.waiting.delete(id);
			clearTimeout(held.timer);
			held.refuse(refusalOf(REFUSAL_GONE, saying));
		}
	}

	private retire(session: Session, how: NodeJS.Signals): void {
		if (this.session === session) { this.session = null; }
		session.lost = true;
		try { session.child.stdin?.end(); } catch {}
		try { session.child.kill(how); } catch {}
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

// ONE MORE TRY WHEN THE SERVER IS FINISHED RATHER THAN THE ANSWER UNAVAILABLE. A lease turning
// over is ordinary and happens on a tick the caller did not choose, so it is not worth surfacing;
// anything else is.
export async function askServed(
	client: VerbServerClient,
	verb: string,
	args: readonly string[],
	timeoutMs: number
): Promise<ServedAnswer> {
	try {
		return await client.ask(verb, args, timeoutMs);
	} catch (thrown) {
		if (thrown instanceof VerbServerRefusal && START_ANOTHER.has(thrown.refusal)) {
			return client.ask(verb, args, timeoutMs);
		}
		throw thrown;
	}
}

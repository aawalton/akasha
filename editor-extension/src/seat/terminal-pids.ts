export const PROCESS_ID_TIMEOUT_MS = 5_000;

export interface HasProcessId {
	readonly processId: PromiseLike<number | undefined>;
}

const NEVER_ANSWERED = Symbol('never answered');

export type PidReading<T> =
	| { readonly terminal: T; readonly pid: number; readonly outcome: 'read' }
	| { readonly terminal: T; readonly pid: undefined; readonly outcome: 'no process' }
	| { readonly terminal: T; readonly pid: undefined; readonly outcome: 'never answered' };

export async function readProcessIds<T extends HasProcessId>(
	terminals: readonly T[],
	ms: number = PROCESS_ID_TIMEOUT_MS
): Promise<readonly PidReading<T>[]> {
	if (terminals.length === 0) { return []; }

	let timer: ReturnType<typeof setTimeout> | undefined;
	const expiry = new Promise<typeof NEVER_ANSWERED>((resolve) => {
		timer = setTimeout(() => resolve(NEVER_ANSWERED), ms);
	});

	try {
		return await Promise.all(
			terminals.map(async (terminal): Promise<PidReading<T>> => {
				const answer = await Promise.race([
					Promise.resolve(terminal.processId).then(
						(pid) => pid,
						(): typeof NEVER_ANSWERED => NEVER_ANSWERED
					),
					expiry,
				]);
				if (answer === NEVER_ANSWERED) {
					return { terminal, pid: undefined, outcome: 'never answered' };
				}
				if (answer === undefined) {
					return { terminal, pid: undefined, outcome: 'no process' };
				}
				return { terminal, pid: answer, outcome: 'read' };
			})
		);
	} finally {
		if (timer !== undefined) { clearTimeout(timer); }
	}
}

export interface PidTally {
	readonly swept: number;
	readonly read: number;
	readonly noProcess: number;
	readonly neverAnswered: number;
}

export function tally<T>(readings: readonly PidReading<T>[]): PidTally {
	let read = 0;
	let noProcess = 0;
	let neverAnswered = 0;
	for (const reading of readings) {
		if (reading.outcome === 'read') { read += 1; }
		else if (reading.outcome === 'no process') { noProcess += 1; }
		else { neverAnswered += 1; }
	}
	return { swept: readings.length, read, noProcess, neverAnswered };
}

export function tallyLine(counted: PidTally, ms: number): string {
	const parts = [`${counted.read} read`];
	if (counted.noProcess > 0) { parts.push(`${counted.noProcess} with no process`); }
	if (counted.neverAnswered > 0) { parts.push(`${counted.neverAnswered} NEVER ANSWERED`); }
	return `${counted.swept} terminal(s) swept in ${ms}ms: ${parts.join(', ')}`;
}

export interface HasIdentity {
	readonly name: string;
	readonly creationOptions: {
		readonly shellPath?: string | undefined;
		readonly cwd?: string | { readonly path?: string } | undefined;
		readonly hideFromUser?: boolean | undefined;
		readonly location?: unknown;
	};
	readonly exitStatus?: { readonly code?: number | undefined } | undefined;
}

const LOCATION_EDITOR = 2;

function describeLocation(location: unknown): string {
	if (location === undefined) { return 'unset'; }
	if (typeof location === 'number') { return location === LOCATION_EDITOR ? 'editor' : 'panel'; }
	if (typeof location === 'object' && location !== null) {
		const shape = location as { readonly viewColumn?: unknown; readonly parentTerminal?: unknown };
		if (shape.viewColumn !== undefined) { return 'editor'; }
		if (shape.parentTerminal !== undefined) { return 'split'; }
	}
	return 'other';
}

function describeCwd(cwd: string | { readonly path?: string } | undefined): string {
	if (cwd === undefined) { return 'unset'; }
	return JSON.stringify(typeof cwd === 'string' ? cwd : cwd.path ?? '');
}

export function describeTerminal(terminal: HasIdentity, index: number, of: number): string {
	const options = terminal.creationOptions;
	return [
		`#${index + 1}/${of}`,
		`name=${JSON.stringify(terminal.name)}`,
		`shellPath=${options.shellPath === undefined ? 'unset' : JSON.stringify(options.shellPath)}`,
		`cwd=${describeCwd(options.cwd)}`,
		`hideFromUser=${options.hideFromUser === true}`,
		`location=${describeLocation(options.location)}`,
		terminal.exitStatus === undefined
			? 'running'
			: `exited(code=${terminal.exitStatus.code ?? 'none'})`,
	].join(' ');
}

export function identified<T>(
	readings: readonly PidReading<T>[]
): readonly { readonly terminal: T; readonly pid: number }[] {
	const found: { terminal: T; pid: number }[] = [];
	for (const reading of readings) {
		if (reading.outcome === 'read') { found.push({ terminal: reading.terminal, pid: reading.pid }); }
	}
	return found;
}

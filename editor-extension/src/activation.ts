export const NO_ANSWER = Symbol('no answer');

export async function answerWithin<T>(
	promise: PromiseLike<T>,
	ms: number
): Promise<T | typeof NO_ANSWER> {
	let timer: ReturnType<typeof setTimeout> | undefined;
	const expiry = new Promise<typeof NO_ANSWER>((resolve) => {
		timer = setTimeout(() => resolve(NO_ANSWER), ms);
	});
	try {
		return await Promise.race([promise, expiry]);
	} finally {
		if (timer !== undefined) { clearTimeout(timer); }
	}
}

export type Startable = {
	readonly name: string;
	readonly start: () => Promise<unknown>;
};

export type Outcome = {
	readonly name: string;
	readonly state: 'activated' | 'failed' | 'still running';
	readonly error?: string;
	readonly ms: number;
};

export async function startIsolated(
	startables: readonly Startable[],
	timeoutMs: number,
	log: (line: string) => void
): Promise<readonly Outcome[]> {
	return Promise.all(
		startables.map(async (startable): Promise<Outcome> => {
			const began = Date.now();
			let state: Outcome['state'] = 'still running';
			let error: string | undefined;
			let ms: number | undefined;

			const running = startable.start().then(
				() => {
					state = 'activated';
					ms = Date.now() - began;
					log(`[${startable.name}] activated in ${ms}ms`);
				},
				(err: unknown) => {
					state = 'failed';
					ms = Date.now() - began;
					error = err instanceof Error ? err.message : String(err);
					log(`[${startable.name}] FAILED after ${ms}ms: ${error}`);
				}
			);

			await answerWithin(running, timeoutMs);

			if (state === 'still running') {
				log(
					`[${startable.name}] has not finished after ${timeoutMs}ms — no longer ` +
					`waiting for it. Everything else is unaffected.`
				);
			}
			return { name: startable.name, state, error, ms: ms ?? timeoutMs };
		})
	);
}

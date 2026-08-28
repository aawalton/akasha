export interface SettledRefresh {
	readonly request: (trigger: string) => undefined;
	readonly dispose: () => undefined;
}

export function createSettledRefresh(
	quietMs: number,
	run: (trigger: string) => Promise<undefined>
): SettledRefresh {
	let timer: ReturnType<typeof setTimeout> | undefined;
	let running = false;
	let queued: string | undefined;

	const drain = async (first: string): Promise<undefined> => {
		running = true;
		try {
			let trigger: string | undefined = first;
			while (trigger !== undefined) {
				try {
					await run(trigger);
				} catch {
				}
				trigger = queued;
				queued = undefined;
			}
		} finally {
			running = false;
		}
		return undefined;
	};

	return {
		request: (trigger: string) => {
			if (timer !== undefined) { clearTimeout(timer); }
			timer = setTimeout(() => {
				timer = undefined;
				if (running) {
					queued = trigger;
					return;
				}
				void drain(trigger);
			}, quietMs);
			return undefined;
		},
		dispose: () => {
			if (timer !== undefined) { clearTimeout(timer); }
			timer = undefined;
			queued = undefined;
			return undefined;
		},
	};
}

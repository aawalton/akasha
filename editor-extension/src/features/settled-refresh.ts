export interface SettledRefresh {
	readonly request: (trigger: string) => undefined;
	readonly dispose: () => undefined;
}

// HOW LONG THE QUIET HAS TO LAST, ASKED EACH TIME RATHER THAN FIXED ONCE. A caller that watches a
// corpus eleven other agents are writing into wants to lengthen the quiet it demands while its
// answers keep coming back identical, and shorten it the moment one differs. Passing a number is
// what every caller here did and still does; passing a function is how one of them varies it.
export function createSettledRefresh(
	quiet: number | (() => number),
	run: (trigger: string) => Promise<undefined>
): SettledRefresh {
	const quietMs = typeof quiet === 'number' ? (): number => quiet : quiet;
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
			}, quietMs());
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

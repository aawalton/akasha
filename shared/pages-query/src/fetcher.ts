import type { Fetcher } from "./index"

let chosen: Fetcher | null = null

/**
 * Answer every later call in this package through `fetcher` rather than over the network.
 *
 * A CALLER SITTING ON THE PAGES HAS NO WIRE TO CROSS. Every function here reaches the pages by
 * URL, and on the workstation nothing answers on any origin it resolves. A process that can read
 * the checkouts itself installs a fetcher that does, once, and every call site below it is
 * answered in process without being told — including the ones that take no asker and no fetcher
 * of their own, which is most of them.
 *
 * NOTHING CHANGES FOR A CALLER THAT INSTALLS NOTHING. `chosen` starts null and the native `fetch`
 * stays the default, so an off-workstation caller reaches its origin exactly as it did before.
 */
export function fetchThrough(fetcher: Fetcher | null): void {
  chosen = fetcher
}

export function pagesFetcher(): Fetcher {
  return chosen ?? (fetch as Fetcher)
}

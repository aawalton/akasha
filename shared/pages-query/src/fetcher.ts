import type { Fetcher } from "./index.ts"

let chosen: Fetcher | null = null

export function fetchThrough(fetcher: Fetcher | null): void {
  chosen = fetcher
}

export function pagesFetcher(): Fetcher {
  return chosen ?? (fetch as Fetcher)
}

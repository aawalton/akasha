import type { Fetcher } from "@akasha/pages-system-service/calling"

export function answering(said: unknown): Fetcher {
  return async () => Response.json(said)
}

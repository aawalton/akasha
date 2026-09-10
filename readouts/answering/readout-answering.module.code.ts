import type { Fetcher } from "@akasha/pages/service/calling"

export function answering(said: unknown): Fetcher {
  return async () => Response.json(said)
}

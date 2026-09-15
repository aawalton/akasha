import type { Fetcher } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

export function answering(said: unknown): Fetcher {
  return async () => Response.json(said)
}

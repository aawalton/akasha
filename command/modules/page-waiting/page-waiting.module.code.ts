import { readsFileAt } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { askedBack } from "akasha/agent/subagent/modules/page-asking/subagent-page-asking.module.code.ts"

const ASKED_EVERY = 150

export type PageAsking = (root: string, agentId: string) => boolean

export function pagedWithin(root: string, agentId: string, within: number): boolean {
  const until = Date.now() + within
  for (;;) {
    if (readsFileAt(root, agentId) !== null) return true
    const left = until - Date.now()
    if (left <= 0) return false
    Bun.sleepSync(Math.min(ASKED_EVERY, left))
  }
}

export function pagedFor(
  root: string,
  agentId: string,
  within: number,
  asking: PageAsking = askedBack
): boolean {
  if (readsFileAt(root, agentId) !== null) return true
  asking(root, agentId)
  return pagedWithin(root, agentId, within)
}

import { getEsoDayStr } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import {
  type PollLogger,
  pollInboxCounts,
} from "../count-polling/inbox-count-polling.module.code.ts"
import {
  type PersistOutcome,
  persistInboxCounts,
} from "../count-writing/inbox-count-writing.module.code.ts"
import { INBOX_KEYS, type InboxKey } from "../keys/inbox-keys.module.code.ts"

export interface PollAndPersistSummary {
  readonly day: string
  readonly counts: Partial<Record<InboxKey, number>>
  readonly failed: readonly InboxKey[]
  readonly outcome: PersistOutcome
}

export async function pollAndPersist(log: PollLogger): Promise<PollAndPersistSummary> {
  const now = new Date()
  const day = getEsoDayStr(now)
  const counts = await pollInboxCounts(day, log)
  const outcome = await persistInboxCounts(counts, day, now)
  const failed = INBOX_KEYS.filter((key) => counts[key] === undefined)
  return { day, counts, failed, outcome }
}

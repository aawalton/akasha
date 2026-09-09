import { join } from "node:path"
import { saidBy } from "@akasha/command-system/fault-saying"
import { getEsoDayStr } from "@akasha/day/eso-day"
import { indexNamed } from "@akasha/indexes"
import { indexValue } from "@akasha/indexes/value/page"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages/checkout-roots"
import { keepReading } from "@akasha/readouts/readout-reading"
import {
  NO_SECRET_TO_CARRY_ON,
  RELAY_SECRET_NAME,
  readoutNamedBy,
  relayReading,
  statedIn,
} from "@akasha/readouts/readout-relay"
import { followFolders } from "@akasha/service/file-following"
import {
  pollTaskCounts,
  type TaskCounts,
} from "../count-polling/inbox-count-polling.module.code.ts"
import { persistInboxCounts } from "../count-writing/inbox-count-writing.module.code.ts"
import { tasksPage, temperTasksPage } from "../reading/inbox-reading.module.code.ts"

export const SETTLE_MS = 250

export const NO_SITE_NAMED =
  "no site was named, so a count taken here would be carried nowhere. Name the origin of the " +
  "site showing these counts as this watch's one argument."

export type WatchLogger = (level: "INFO" | "ERROR", message: string) => void

export function countsSaid(day: string, counts: TaskCounts): string {
  return `day=${day} tasks=${counts.tasks} temperTasks=${counts.temperTasks}`
}

export function valuesFollowedIn(root: string): string {
  return join(root, indexNamed(), indexValue.name)
}

export async function carryCounts(
  root: string,
  to: string,
  secret: string | null,
  day: string,
  now: Date,
  counts: TaskCounts
): Promise<undefined> {
  await persistInboxCounts({ tasks: counts.tasks, temperTasks: counts.temperTasks }, day, now)
  const took: readonly (readonly [string, number])[] = [
    [tasksPage(root), counts.tasks],
    [temperTasksPage(root), counts.temperTasks],
  ]
  for (const [page, value] of took) keepReading(root, page, value, now)
  if (secret === null) return undefined
  const at = now.toISOString()
  for (const [page, value] of took) {
    await relayReading(to, secret, { readout: readoutNamedBy(page), value, at })
  }
  return undefined
}

export function watchInboxCounts(to: string, log: WatchLogger): () => undefined {
  const root = rootFor(resolveRoots(), AKASHA)
  const secret = statedIn(process.env, RELAY_SECRET_NAME)
  if (secret === null) log("ERROR", NO_SECRET_TO_CARRY_ON)
  let before: string | null = null
  let taking = false
  let owed = false

  const take = async (): Promise<undefined> => {
    if (taking) {
      owed = true
      return undefined
    }
    taking = true
    try {
      do {
        owed = false
        const now = new Date()
        const day = getEsoDayStr(now)
        const counts = await pollTaskCounts(day)
        const found = countsSaid(day, counts)
        if (found === before) continue
        await carryCounts(root, to, secret, day, now, counts)
        before = found
        log("INFO", found)
      } while (owed)
    } finally {
      taking = false
    }
    return undefined
  }

  const following = followFolders(
    new Set([valuesFollowedIn(root)]),
    (): undefined => {
      take().catch((thrown: unknown) => {
        log("ERROR", saidBy(thrown))
        process.exit(1)
      })
      return undefined
    },
    SETTLE_MS
  )
  return following.stop
}

if (import.meta.main) {
  const to = (process.argv[2] ?? "").trim()
  if (to === "") {
    process.stderr.write(`${NO_SITE_NAMED}\n`)
    process.exit(2)
  }
  watchInboxCounts(to, (level, message) => {
    const out = level === "ERROR" ? process.stderr : process.stdout
    out.write(`${message}\n`)
  })
}

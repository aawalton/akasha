import { dirname, join } from "node:path"
import { gapRowsAt } from "akasha/alan/harness/code-editor/data-interface/modules/gap-row-filing/gap-row-filing.module.code.ts"
import { getEsoDayStr } from "akasha/alan/harness/day-boundary/modules/eso-day/eso-day.module.code.ts"
import {
  pollTaskCounts,
  type TaskCounts,
} from "akasha/alan/harness/inbox/modules/count-polling/inbox-count-polling.module.code.ts"
import { persistInboxCounts } from "akasha/alan/harness/inbox/modules/count-writing/inbox-count-writing.module.code.ts"
import { countedReadouts } from "akasha/alan/harness/inbox/modules/reading/inbox-reading.module.code.ts"
import { keepReading } from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import {
  NO_SECRET_TO_CARRY_ON,
  RELAY_SECRET_NAME,
  readoutNamedBy,
  relayReading,
  statedIn,
} from "akasha/alan/harness/readout/modules/relay/readout-relay.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { leftWhereCodeMoved } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/code-moving/code-moving.module.code.ts"
import {
  dirsOf,
  type Following,
  followFolders,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/file-following/file-following.module.code.ts"
import { everyOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

export const SETTLE_MS = 250

const TO_DO_PAGE_TYPE_SLUG = "to-do"

const TEMPER_TASK_PAGE_TYPE_SLUG = "temper-task"

const FINDING_PAGE_TYPE_SLUG = "finding"

const COUNTED_TYPES: readonly string[] = [
  TO_DO_PAGE_TYPE_SLUG,
  TEMPER_TASK_PAGE_TYPE_SLUG,
  FINDING_PAGE_TYPE_SLUG,
]

const TO_DOS_AT = "alan/track/to-do/pages"

const TEMPER_TASKS_AT = "temper/player/progress/temper-task/pages"

const FINDINGS_AT = "domain/finding/pages"

const FINDING_TYPE_AT = "domain/finding"

export const NO_SITE_NAMED =
  "no site was named, so a count taken here would be carried nowhere. Name the origin of the " +
  "site showing these counts as this watch's one argument."

export type WatchLogger = (level: "INFO" | "ERROR", message: string) => void

export function countsSaid(day: string, counts: TaskCounts): string {
  return (
    `day=${day} tasks=${counts.tasks} temperTasks=${counts.temperTasks} ` +
    `findings=${counts.findings} gaps=${counts.gaps}`
  )
}

export function foldersFollowedIn(root: string): ReadonlySet<string> {
  const folders = new Set<string>(
    [TO_DOS_AT, TEMPER_TASKS_AT, FINDINGS_AT, FINDING_TYPE_AT, dirname(gapRowsAt())].map((at) =>
      join(root, at)
    )
  )
  for (const slug of COUNTED_TYPES) {
    const pages = everyOfType(root, slug).map((one) => join(root, one.path))
    for (const one of dirsOf(pages)) folders.add(one)
  }
  return folders
}

export async function carryCounts(
  root: string,
  to: string,
  secret: string | null,
  day: string,
  now: Date,
  counts: TaskCounts
): Promise<undefined> {
  await persistInboxCounts(
    {
      tasks: counts.tasks,
      temperTasks: counts.temperTasks,
      findings: counts.findings,
      gaps: counts.gaps,
    },
    day,
    now
  )
  const byWireKey: Readonly<Record<string, number>> = counts
  const took: (readonly [string, number])[] = []
  for (const one of countedReadouts(root)) {
    const value = byWireKey[one.wireKey]
    if (value !== undefined) took.push([one.page, value])
  }
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
        leftWhereCodeMoved()
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

  let following: Following | null = null
  let watched = ""

  const refollow = (): undefined => {
    const folders = foldersFollowedIn(root)
    const key = [...folders].sort().join("\n")
    if (key === watched) return undefined
    following?.stop()
    watched = key
    following = followFolders(
      folders,
      (): undefined => {
        take().catch((thrown: unknown) => {
          log("ERROR", saidBy(thrown))
          process.exit(1)
        })
        refollow()
        return undefined
      },
      SETTLE_MS
    )
    return undefined
  }

  refollow()
  return (): undefined => {
    following?.stop()
    following = null
    return undefined
  }
}

export function runInboxCountWatch(to: string): () => undefined {
  return watchInboxCounts(to, (level, message) => {
    const out = level === "ERROR" ? process.stderr : process.stdout
    out.write(`${message}\n`)
  })
}

if (import.meta.main) {
  const to = (process.argv[2] ?? "").trim()
  if (to === "") {
    process.stderr.write(`${NO_SITE_NAMED}\n`)
    process.exit(2)
  }
  runInboxCountWatch(to)
}

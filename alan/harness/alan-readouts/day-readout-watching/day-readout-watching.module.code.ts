import { join } from "node:path"
import {
  getEsoDayStr,
  getEsoDayWindow,
} from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import { keepSilence } from "akasha/alan/harness/readouts/reading/readout-reading.module.code.ts"
import {
  SETTLE_MS,
  type WatchedReadout,
  type Watching,
  type WatchLogger,
  watchReadings,
} from "akasha/alan/harness/readouts/watching/readout-watching.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { followFolders } from "akasha/services/workstation-services/file-following/file-following.module.code.ts"
import { keepBeat } from "akasha/services/workstation-services/service-beating/service-beating.module.code.ts"
import { DAY_PAGE_TYPE } from "../../../track/daily/day-place/day-place.module.code.ts"
import {
  CHARISMA_PAGE,
  CONSTITUTION_PAGE,
  ENDURANCE_PAGE,
  INTELLIGENCE_PAGE,
  STRENGTH_PAGE,
  takeReadings as takeAttributes,
  WISDOM_PAGE,
} from "../../attributes/reading/attributes-reading.module.code.ts"
import {
  READOUT_PAGE as CAPACITY_PAGE,
  takeReading as takeCapacity,
} from "../../capacity/reading/capacity-reading.module.code.ts"
import {
  READOUT_PAGE as COST_PAGE,
  takeReading as takeCost,
} from "../../cost/reading/cost-reading.module.code.ts"
import {
  takeReadings as takeInboxes,
  tasksPage,
} from "../../inboxes/reading/inbox-reading.module.code.ts"
import {
  READOUT_PAGE as SAFETY_PAGE,
  takeReading as takeSafety,
} from "../../safety/reading/safety-reading.module.code.ts"
import {
  READOUT_PAGE as SLEEP_PAGE,
  takeReading as takeSleep,
} from "../../sleep/reading/sleep-reading.module.code.ts"
import {
  READOUT_PAGE as SURPLUS_PAGE,
  takeReading as takeSurplus,
} from "../../surplus/reading/surplus-reading.module.code.ts"

export const DAYS_AT = "alan/track/daily/days/pages"

export const ALAN_SITE = "https://alanwalton.com"

export const JENNY_SITE = "https://smilingjenny.me"

export const ROLL_GRACE_MS = 5_000

export const ROLL_NO_SOONER_MS = 60_000

export const BEAT_MS = 5 * 60_000

export const WATCH_PAGE =
  "alan/harness/alan-readouts/day-readout-watch-service/day-readout-watch-service.workstation-service.ts"

const BOTH_SITES: readonly string[] = [ALAN_SITE, JENNY_SITE]

const HIS_SITE: readonly string[] = [ALAN_SITE]

export const FOOD_ENTRY_PAGE_TYPE = "food-entry"

const FROM_THE_DAY: readonly string[] = [DAY_PAGE_TYPE]

const FROM_THE_FOOD: readonly string[] = [FOOD_ENTRY_PAGE_TYPE]

export type DayFiles = {
  readonly folder: string
  readonly row: string
  readonly open: string
  readonly stretches: string
}

export function daysFolder(root: string): string {
  return join(root, DAYS_AT)
}

export function dayFilesOf(root: string, day: string): DayFiles {
  const folder = join(daysFolder(root), day)
  return {
    folder,
    row: join(folder, `day-${day}.day.ts`),
    open: join(folder, `day-${day}.day.uncommitted.ts`),
    stretches: join(folder, `day-${day}.day.sessions.jsonl`),
  }
}

export function madeOf(...files: readonly string[]): (at: string) => boolean {
  const held = new Set(files)
  return (at) => held.has(at)
}

export function shared<T>(work: (now: Date) => Promise<T>): (now: Date) => Promise<T> {
  let running: Promise<T> | null = null
  return (now) => {
    const held = running
    if (held !== null) return held
    const one = work(now).finally((): undefined => {
      running = null
      return undefined
    })
    running = one
    return one
  }
}

export function dayReadouts(root: string, day: string): readonly WatchedReadout[] {
  const files = dayFilesOf(root, day)
  const folders = [files.folder]
  const attributes = shared((now: Date) => takeAttributes(root, now))
  const inboxes = shared((now: Date) => takeInboxes(root, now))
  const attributeAt =
    (page: string) =>
    async (now: Date): Promise<number | null> =>
      (await attributes(now)).kept[page] ?? null
  const openBlock = madeOf(files.stretches)
  const dayRow = madeOf(files.row, files.open)
  const dayRowAndStretches = madeOf(files.row, files.open, files.stretches)
  const tasks = tasksPage(root)
  return [
    {
      page: SAFETY_PAGE,
      folders,
      holds: openBlock,
      to: BOTH_SITES,
      take: (now) => takeSafety(root, now),
    },
    {
      page: COST_PAGE,
      folders,
      holds: openBlock,
      to: BOTH_SITES,
      take: (now) => takeCost(root, now),
    },
    {
      page: SURPLUS_PAGE,
      folders,
      holds: dayRowAndStretches,
      pageTypes: FROM_THE_DAY,
      to: BOTH_SITES,
      take: (now) => takeSurplus(root, now),
    },
    {
      page: SLEEP_PAGE,
      folders,
      holds: dayRow,
      pageTypes: FROM_THE_DAY,
      to: BOTH_SITES,
      take: (now) => takeSleep(root, now),
    },
    {
      page: CAPACITY_PAGE,
      folders,
      holds: dayRowAndStretches,
      pageTypes: FROM_THE_DAY,
      to: BOTH_SITES,
      take: (now) => takeCapacity(root, now),
    },
    {
      page: tasks,
      folders,
      holds: dayRow,
      pageTypes: FROM_THE_DAY,
      to: HIS_SITE,
      take: async (now) => (await inboxes(now)).kept[tasks] ?? null,
    },
    {
      page: STRENGTH_PAGE,
      folders,
      holds: dayRow,
      pageTypes: FROM_THE_DAY,
      to: HIS_SITE,
      take: attributeAt(STRENGTH_PAGE),
    },
    {
      page: ENDURANCE_PAGE,
      folders,
      holds: dayRow,
      pageTypes: FROM_THE_DAY,
      to: HIS_SITE,
      take: attributeAt(ENDURANCE_PAGE),
    },
    {
      page: WISDOM_PAGE,
      folders,
      holds: dayRow,
      pageTypes: FROM_THE_DAY,
      to: HIS_SITE,
      take: attributeAt(WISDOM_PAGE),
    },
    {
      page: INTELLIGENCE_PAGE,
      folders,
      holds: dayRow,
      pageTypes: FROM_THE_DAY,
      to: HIS_SITE,
      take: attributeAt(INTELLIGENCE_PAGE),
    },
    {
      page: CHARISMA_PAGE,
      folders,
      holds: dayRowAndStretches,
      pageTypes: FROM_THE_DAY,
      to: HIS_SITE,
      take: attributeAt(CHARISMA_PAGE),
    },
    {
      page: CONSTITUTION_PAGE,
      folders,
      holds: dayRow,
      pageTypes: FROM_THE_FOOD,
      to: HIS_SITE,
      take: attributeAt(CONSTITUTION_PAGE),
    },
  ]
}

export function watchDayReadings(
  said: WatchLogger,
  ended: (thrown: unknown) => undefined
): () => undefined {
  const root = rootFor(resolveRoots(), AKASHA)
  let day = getEsoDayStr(new Date())
  let watched = dayReadouts(root, day)

  const beat = (silent: ReadonlySet<string>, at: Date): undefined => {
    keepSilence(
      root,
      watched.map((one) => one.page),
      silent,
      at
    )
    keepBeat(root, WATCH_PAGE, at)
    return undefined
  }

  let running: Watching = watchReadings({ root, watched, said, ended, beat })
  let rolling: ReturnType<typeof setTimeout> | null = null
  const beating = setInterval((): undefined => {
    running.retake()
    return undefined
  }, BEAT_MS)

  const renew = (): undefined => {
    const opened = getEsoDayStr(new Date())
    if (opened === day && running.unfollowed.length === 0) return undefined
    day = opened
    running.stop()
    watched = dayReadouts(root, day)
    running = watchReadings({ root, watched, said, ended, beat })
    said("INFO", `the readings are taken off ${day} from here on`)
    return undefined
  }

  const waitForTheRoll = (): undefined => {
    if (rolling !== null) clearTimeout(rolling)
    const ends = getEsoDayWindow(day).end.getTime()
    const waiting = Math.max(ROLL_NO_SOONER_MS, ends - Date.now() + ROLL_GRACE_MS)
    rolling = setTimeout(() => {
      renew()
      waitForTheRoll()
    }, waiting)
    return undefined
  }

  waitForTheRoll()

  const following = followFolders(
    new Set([daysFolder(root)]),
    (): undefined => {
      renew()
      waitForTheRoll()
      return undefined
    },
    SETTLE_MS
  )

  return (): undefined => {
    if (rolling !== null) clearTimeout(rolling)
    clearInterval(beating)
    following.stop()
    running.stop()
    return undefined
  }
}

if (import.meta.main) {
  watchDayReadings(
    (level, message): undefined => {
      const out = level === "ERROR" ? process.stderr : process.stdout
      out.write(`${message}\n`)
      return undefined
    },
    (): undefined => process.exit(1)
  )
}

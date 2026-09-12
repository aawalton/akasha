import { join } from "node:path"
import {
  CHARISMA_PAGE,
  CONSTITUTION_PAGE,
  ENDURANCE_PAGE,
  INTELLIGENCE_PAGE,
  STRENGTH_PAGE,
  takeReadings as takeAttributes,
  WISDOM_PAGE,
} from "akasha/alan/harness/attributes/modules/reading/attributes-reading.module.code.ts"
import {
  READOUT_SLUG as CAPACITY_SLUG,
  takeReading as takeCapacity,
} from "akasha/alan/harness/capacity/modules/reading/capacity-reading.module.code.ts"
import {
  READOUT_SLUG as COST_SLUG,
  takeReading as takeCost,
} from "akasha/alan/harness/cost/reading/cost-reading.module.code.ts"
import { getEsoDayWindow } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import {
  takeReadings as takeInboxes,
  tasksPage,
} from "akasha/alan/harness/inboxes/reading/inbox-reading.module.code.ts"
import {
  READOUT_SLUG as PLANTS_SLUG,
  takeReading as takePlants,
} from "akasha/alan/harness/plants/reading/plants-reading.module.code.ts"
import {
  keepSilence,
  readoutPage,
} from "akasha/alan/harness/readouts/reading/readout-reading.module.code.ts"
import {
  SETTLE_MS,
  type WatchedReadout,
  type Watching,
  type WatchLogger,
  watchReadings,
} from "akasha/alan/harness/readouts/watching/readout-watching.module.code.ts"
import {
  READOUT_SLUG as SAFETY_SLUG,
  takeReading as takeSafety,
} from "akasha/alan/harness/safety/reading/safety-reading.module.code.ts"
import {
  READOUT_SLUG as SLEEP_SLUG,
  takeReading as takeSleep,
} from "akasha/alan/harness/sleep/reading/sleep-reading.module.code.ts"
import {
  READOUT_SLUG as SURPLUS_SLUG,
  takeReading as takeSurplus,
} from "akasha/alan/harness/surplus/reading/surplus-reading.module.code.ts"
import { openedDayOf } from "akasha/alan/track/daily/day-opening/day-opening.module.code.ts"
import { DAY_PAGE_TYPE } from "akasha/alan/track/daily/day-place/day-place.module.code.ts"
import { followFolders } from "akasha/infrastructure/services/workstations/file-following/file-following.module.code.ts"
import { keepBeat } from "akasha/infrastructure/services/workstations/service-beating/service-beating.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

export const DAYS_AT = "alan/track/daily/days/pages"

export const ALAN_SITE = "https://alanwalton.com"

export const JENNY_SITE = "https://smilingjenny.me"

export const ROLL_GRACE_MS = 5_000

export const ROLL_NO_SOONER_MS = 60_000

export const BEAT_MS = 5 * 60_000

const WATCH_SERVICE = "service-workstation"

export const WATCH_SLUG = "day-readout-watch-service"

export function watchPage(root: string): string {
  const listed = listedAt(root, WATCH_SERVICE, WATCH_SLUG)[0]
  if (listed === undefined) {
    throw new Error(
      `no \`${WATCH_SERVICE}\` is slugged \`${WATCH_SLUG}\`, so a beat would be kept nowhere`
    )
  }
  return listed.path
}

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
  const pageAt = (slug: string): string => readoutPage(root, slug)
  return [
    {
      page: pageAt(SAFETY_SLUG),
      folders,
      holds: openBlock,
      to: BOTH_SITES,
      take: (now) => takeSafety(root, now),
    },
    {
      page: pageAt(COST_SLUG),
      folders,
      holds: openBlock,
      to: BOTH_SITES,
      take: (now) => takeCost(root, now),
    },
    {
      page: pageAt(SURPLUS_SLUG),
      folders,
      holds: dayRowAndStretches,
      pageTypes: FROM_THE_DAY,
      to: BOTH_SITES,
      take: (now) => takeSurplus(root, now),
    },
    {
      page: pageAt(SLEEP_SLUG),
      folders,
      holds: dayRow,
      pageTypes: FROM_THE_DAY,
      to: BOTH_SITES,
      take: (now) => takeSleep(root, now),
    },
    {
      page: pageAt(CAPACITY_SLUG),
      folders,
      holds: dayRowAndStretches,
      pageTypes: FROM_THE_DAY,
      to: BOTH_SITES,
      take: (now) => takeCapacity(root, now),
    },
    {
      page: pageAt(PLANTS_SLUG),
      folders,
      holds: dayRow,
      pageTypes: FROM_THE_FOOD,
      to: BOTH_SITES,
      take: (now) => takePlants(root, now),
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
  const roots = resolveRoots()
  const root = rootFor(roots, AKASHA)
  let day = openedDayOf(roots, new Date())
  let watched = dayReadouts(root, day)

  const beat = (silent: ReadonlySet<string>, at: Date): undefined => {
    keepSilence(
      root,
      watched.map((one) => one.page),
      silent,
      at
    )
    keepBeat(root, watchPage(root), at)
    return undefined
  }

  let running: Watching = watchReadings({ root, watched, said, ended, beat })
  let rolling: ReturnType<typeof setTimeout> | null = null
  const beating = setInterval((): undefined => {
    running.retake()
    return undefined
  }, BEAT_MS)

  const renew = (): undefined => {
    const opened = openedDayOf(roots, new Date())
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

export const sayOnTheConsole: WatchLogger = (level, message): undefined => {
  const out = level === "ERROR" ? process.stderr : process.stdout
  out.write(`${message}\n`)
  return undefined
}

if (import.meta.main) {
  watchDayReadings(sayOnTheConsole, (): undefined => process.exit(1))
}

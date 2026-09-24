import { join } from "node:path"
import {
  CHARISMA_PAGE,
  CONSTITUTION_PAGE,
  ENDURANCE_PAGE,
  INTELLIGENCE_PAGE,
  STRENGTH_PAGE,
  takeReadings as takeAttributes,
  WISDOM_PAGE,
} from "akasha/alan/harness/attribute/modules/attributes-reading/attributes-reading.module.code.ts"
import {
  READOUT_SLUG as CAPACITY_SLUG,
  takeReading as takeCapacity,
} from "akasha/alan/harness/capacity/modules/reading/capacity-reading.module.code.ts"
import {
  READOUT_SLUG as COST_SLUG,
  takeReading as takeCost,
} from "akasha/alan/harness/cost/modules/reading/cost-reading.module.code.ts"
import { getEsoDayWindow } from "akasha/alan/harness/day-boundary/modules/eso-day/eso-day.module.code.ts"
import { takeReadings as takeInboxes } from "akasha/alan/harness/inbox/modules/reading/inbox-reading.module.code.ts"
import {
  READOUT_SLUG as PLANTS_SLUG,
  takeReading as takePlants,
} from "akasha/alan/harness/plant/modules/plants-reading/plants-reading.module.code.ts"
import { readoutPage } from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import {
  SETTLE_MS,
  type WatchedReadout,
  type Watching,
  type WatchLogger,
  watchReadings,
} from "akasha/alan/harness/readout/modules/watching/readout-watching.module.code.ts"
import {
  READOUT_SLUG as SAFETY_SLUG,
  takeReading as takeSafety,
} from "akasha/alan/harness/safety/modules/reading/safety-reading.module.code.ts"
import {
  READOUT_SLUG as SLEEP_SLUG,
  takeReading as takeSleep,
} from "akasha/alan/harness/sleep/modules/reading/sleep-reading.module.code.ts"
import {
  READOUT_SLUG as SURPLUS_SLUG,
  takeReading as takeSurplus,
} from "akasha/alan/harness/surplus/modules/reading/surplus-reading.module.code.ts"
import { openedDayOf } from "akasha/alan/track/daily/modules/day-opening/day-opening.module.code.ts"
import { DAY_PAGE_TYPE } from "akasha/alan/track/daily/modules/day-place/day-place.module.code.ts"
import {
  dirsOf,
  followFolders,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/file-following/file-following.module.code.ts"
import { keepBeat } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-beating/service-beating.module.code.ts"
import {
  everyOfType,
  listedAt,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

export const DAYS_AT = "alan/track/daily/day/pages"

export const ALAN_SITE = "https://alanwalton.com"

export const JENNY_SITE = "https://smilingjenny.me"

export const ROLL_GRACE_MS = 5_000

export const ROLL_NO_SOONER_MS = 60_000

export const BEAT_MS = 5 * 60_000

const TASKS_SLUG = "inboxes-tasks"

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

export const FOODS_AT = "alan/track/food-entry/pages"

export type DayFiles = {
  readonly folder: string
  readonly row: string
  readonly open: string
  readonly stretches: string
}

export function daysFolder(root: string): string {
  return join(root, DAYS_AT)
}

export function foodsFolder(root: string): string {
  return join(root, FOODS_AT)
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

export function anyOf(...held: readonly ((at: string) => boolean)[]): (at: string) => boolean {
  return (at) => held.some((one) => one(at))
}

export type PagesWatched = {
  readonly folders: readonly string[]
  readonly holds: (at: string) => boolean
}

export function pagesOfType(root: string, pageTypeSlug: string): PagesWatched {
  const at = everyOfType(root, pageTypeSlug).map((one) => join(root, one.path))
  return { folders: [...dirsOf(at)], holds: madeOf(...at) }
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
  const days = pagesOfType(root, DAY_PAGE_TYPE)
  const foods = pagesOfType(root, FOOD_ENTRY_PAGE_TYPE)
  const folders = [files.folder]
  const dayFolders = [...folders, ...days.folders]
  const foodFolders = [...folders, ...foods.folders]
  const attributes = shared((now: Date) => takeAttributes(root, now))
  const inboxes = shared((now: Date) => takeInboxes(root, now))
  const attributeAt =
    (page: string) =>
    async (now: Date): Promise<number | null> =>
      (await attributes(now)).kept[page] ?? null
  const openBlock = madeOf(files.stretches)
  const dayRow = madeOf(files.row, files.open)
  const dayRowAndStretches = madeOf(files.row, files.open, files.stretches)
  const everyDay = anyOf(dayRow, days.holds)
  const everyDayAndStretches = anyOf(dayRowAndStretches, days.holds)
  const everyFood = anyOf(dayRow, foods.holds)
  const tasks = readoutPage(root, TASKS_SLUG)
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
      folders: dayFolders,
      holds: everyDayAndStretches,
      to: BOTH_SITES,
      take: (now) => takeSurplus(root, now),
    },
    {
      page: pageAt(SLEEP_SLUG),
      folders: dayFolders,
      holds: everyDay,
      to: BOTH_SITES,
      take: (now) => takeSleep(root, now),
    },
    {
      page: pageAt(CAPACITY_SLUG),
      folders: dayFolders,
      holds: everyDayAndStretches,
      to: BOTH_SITES,
      take: (now) => takeCapacity(root, now),
    },
    {
      page: pageAt(PLANTS_SLUG),
      folders: foodFolders,
      holds: everyFood,
      to: BOTH_SITES,
      take: (now) => takePlants(root, now),
    },
    {
      page: tasks,
      folders: dayFolders,
      holds: everyDay,
      to: HIS_SITE,
      take: async (now) => (await inboxes(now)).kept[tasks] ?? null,
    },
    {
      page: STRENGTH_PAGE,
      folders: dayFolders,
      holds: everyDay,
      to: HIS_SITE,
      take: attributeAt(STRENGTH_PAGE),
    },
    {
      page: ENDURANCE_PAGE,
      folders: dayFolders,
      holds: everyDay,
      to: HIS_SITE,
      take: attributeAt(ENDURANCE_PAGE),
    },
    {
      page: WISDOM_PAGE,
      folders: dayFolders,
      holds: everyDay,
      to: HIS_SITE,
      take: attributeAt(WISDOM_PAGE),
    },
    {
      page: INTELLIGENCE_PAGE,
      folders: dayFolders,
      holds: everyDay,
      to: HIS_SITE,
      take: attributeAt(INTELLIGENCE_PAGE),
    },
    {
      page: CHARISMA_PAGE,
      folders: dayFolders,
      holds: everyDayAndStretches,
      to: HIS_SITE,
      take: attributeAt(CHARISMA_PAGE),
    },
    {
      page: CONSTITUTION_PAGE,
      folders: foodFolders,
      holds: everyFood,
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

  const beat = (at: Date): undefined => {
    keepBeat(root, watchPage(root), at)
    return undefined
  }

  let running: Watching = watchReadings({ root, watched, said, ended, beat })
  let rolling: ReturnType<typeof setTimeout> | null = null
  const beating = setInterval((): undefined => {
    running.retake()
    return undefined
  }, BEAT_MS)

  const rebuild = (opened: string): undefined => {
    day = opened
    running.stop()
    watched = dayReadouts(root, day)
    running = watchReadings({ root, watched, said, ended, beat })
    return undefined
  }

  const renew = (): undefined => {
    const opened = openedDayOf(roots, new Date())
    if (opened === day && running.unfollowed.length === 0) return undefined
    rebuild(opened)
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
    new Set([daysFolder(root), foodsFolder(root)]),
    (): undefined => {
      rebuild(openedDayOf(roots, new Date()))
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

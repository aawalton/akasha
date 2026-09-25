import { join } from "node:path"
import { takeReadings as takeAttributes } from "akasha/alan/harness/attribute/modules/attributes-reading/attributes-reading.module.code.ts"
import { attributesReading } from "akasha/alan/harness/attribute/modules/attributes-reading/attributes-reading.module.ts"
import { takeReading as takeCapacity } from "akasha/alan/harness/capacity/modules/reading/capacity-reading.module.code.ts"
import { capacityReading } from "akasha/alan/harness/capacity/modules/reading/capacity-reading.module.ts"
import { takeReading as takeCost } from "akasha/alan/harness/cost/modules/reading/cost-reading.module.code.ts"
import { costReading } from "akasha/alan/harness/cost/modules/reading/cost-reading.module.ts"
import { getEsoDayWindow } from "akasha/alan/harness/day-boundary/modules/eso-day/eso-day.module.code.ts"
import { takeReadings as takeInboxes } from "akasha/alan/harness/inbox/modules/reading/inbox-reading.module.code.ts"
import { inboxReading } from "akasha/alan/harness/inbox/modules/reading/inbox-reading.module.ts"
import { readoutsServedBy } from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import { sitesCarriedTo } from "akasha/alan/harness/readout/modules/relay/readout-relay.module.code.ts"
import {
  SETTLE_MS,
  type WatchedReadout,
  type Watching,
  type WatchLogger,
  watchReadings,
} from "akasha/alan/harness/readout/modules/watching/readout-watching.module.code.ts"
import { madeFrom } from "akasha/alan/harness/readout/properties/made-from.select-property.ts"
import type { MadeFrom } from "akasha/alan/harness/readout/properties/made-from.select-property.types.ts"
import { takeReading as takeSafety } from "akasha/alan/harness/safety/modules/reading/safety-reading.module.code.ts"
import { safetyReading } from "akasha/alan/harness/safety/modules/reading/safety-reading.module.ts"
import { takeReading as takeSleep } from "akasha/alan/harness/sleep/modules/reading/sleep-reading.module.code.ts"
import { sleepReading } from "akasha/alan/harness/sleep/modules/reading/sleep-reading.module.ts"
import { takeReading as takeSurplus } from "akasha/alan/harness/surplus/modules/reading/surplus-reading.module.code.ts"
import { surplusReading } from "akasha/alan/harness/surplus/modules/reading/surplus-reading.module.ts"
import { openedDayOf } from "akasha/alan/track/daily/modules/day-opening/day-opening.module.code.ts"
import { DAY_PAGE_TYPE } from "akasha/alan/track/daily/modules/day-place/day-place.module.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import {
  dirsOf,
  followFolders,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/file-following/file-following.module.code.ts"
import { keepBeat } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-beating/service-beating.module.code.ts"
import {
  everyOfType,
  listedAt,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

export const DAYS_AT = "alan/track/daily/day/pages"

export const ROLL_GRACE_MS = 5_000

export const ROLL_NO_SOONER_MS = 60_000

export const BEAT_MS = 5 * 60_000

const MADE_FROM = "madeFrom"

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

type Take = (now: Date) => Promise<number | null>

type Taker = (page: string) => Take

type Kept = { readonly kept: Readonly<Record<string, number>> }

type Moved = Pick<WatchedReadout, "folders" | "holds">

function moduleNamed(slug: string): string {
  return namedAs(module.slug, slug, null)
}

function alone(take: Take): Taker {
  return () => take
}

function keptBy(taking: (now: Date) => Promise<Kept>): Taker {
  return (page) => async (now) => (await taking(now)).kept[page] ?? null
}

function takersOf(root: string): ReadonlyMap<string, Taker> {
  return new Map<string, Taker>([
    [moduleNamed(safetyReading.slug), alone((now) => takeSafety(root, now))],
    [moduleNamed(costReading.slug), alone((now) => takeCost(root, now))],
    [moduleNamed(surplusReading.slug), alone((now) => takeSurplus(root, now))],
    [moduleNamed(sleepReading.slug), alone((now) => takeSleep(root, now))],
    [moduleNamed(capacityReading.slug), alone((now) => takeCapacity(root, now))],
    [moduleNamed(attributesReading.slug), keptBy(shared((now) => takeAttributes(root, now)))],
    [moduleNamed(inboxReading.slug), keptBy(shared((now) => takeInboxes(root, now)))],
  ])
}

function movedBy(root: string, day: string): Readonly<Record<MadeFrom, Moved>> {
  const files = dayFilesOf(root, day)
  const days = pagesOfType(root, DAY_PAGE_TYPE)
  const foods = pagesOfType(root, FOOD_ENTRY_PAGE_TYPE)
  const folders = [files.folder]
  const dayFolders = [...folders, ...days.folders]
  const dayRow = madeOf(files.row, files.open)
  return {
    "open-block": { folders, holds: madeOf(files.stretches) },
    "day-row": { folders: dayFolders, holds: anyOf(dayRow, days.holds) },
    "day-row-and-stretches": {
      folders: dayFolders,
      holds: anyOf(madeOf(files.row, files.open, files.stretches), days.holds),
    },
    "day-row-and-food-entries": {
      folders: [...folders, ...foods.folders],
      holds: anyOf(dayRow, foods.holds),
    },
  }
}

function madeFromIn(said: unknown): MadeFrom | null {
  return madeFrom.values.find((one) => one === said) ?? null
}

export function dayReadouts(root: string, day: string): readonly WatchedReadout[] {
  const moved = movedBy(root, day)
  const watched: WatchedReadout[] = []
  for (const [taker, takes] of takersOf(root)) {
    for (const { path, value } of readoutsServedBy(root, taker)) {
      const from = madeFromIn(value[MADE_FROM])
      if (from === null) continue
      watched.push({
        page: path,
        ...moved[from],
        to: sitesCarriedTo(root, value),
        take: takes(path),
      })
    }
  }
  return watched
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

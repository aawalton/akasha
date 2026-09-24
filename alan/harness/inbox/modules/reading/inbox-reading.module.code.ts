import { getEsoDayStr } from "akasha/alan/harness/day-boundary/modules/eso-day/eso-day.module.code.ts"
import { stated } from "akasha/alan/harness/readout/modules/none-left/readout-none-left.module.code.ts"
import { keepReading } from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import { statedAt } from "akasha/alan/harness/readout/modules/tier/readout-tier.module.code.ts"
import type { CountedOn } from "akasha/alan/harness/readout/properties/counted-on.select-property.types.ts"
import { openedDayOf } from "akasha/alan/track/daily/modules/day-opening/day-opening.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { rootStated } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  listedFor,
  valueByPath,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressedIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { resolveRoots } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { camelizeKey } from "akasha/page/naming/folding/modules/camelize-key/camelize-key.module.code.ts"
import {
  asking,
  type Query,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"

const READOUT = "readout"

const DAY = "day"

const DATE = "date"

const PROPERTY_SLUG = "propertySlug"

const NO_PLACE = 0

type DayRead = {
  readonly dateOn: (now: Date) => string
  readonly unread: string
  readonly none: (date: string) => string
  readonly noCount: (date: string, countName: string) => string
}

const DAYS: Readonly<Record<CountedOn, DayRead>> = {
  "eso-day": {
    dateOn: getEsoDayStr,
    unread:
      "the tracking day could not be read, so the inboxes on it are unknown rather than empty",
    none: (date) => `no tracking day is written down for ${date}`,
    noCount: (date, countName) => `the tracking day for ${date} states no ${countName}`,
  },
  "opened-day": {
    dateOn: (now) => openedDayOf(resolveRoots(), now),
    unread: "the day could not be read, so the mail inbox is unknown rather than empty",
    none: (date) => `no day is written down for ${date}`,
    noCount: (date, countName) => `the day ${date} states no ${countName}`,
  },
}

const DAYS_READ: readonly CountedOn[] = ["eso-day", "opened-day"]

export type Counted = {
  readonly page: string
  readonly wireKey: string
  readonly countedOn: CountedOn
  readonly key: string
  readonly countName: string
}

function countedOnIn(said: unknown): CountedOn | null {
  const one = stated(said)
  return DAYS_READ.find((day) => day === one) ?? null
}

function keyOf(root: string, named: string, page: string): string {
  const address = addressedIn(named)
  const listed = "refused" in address ? null : listedFor(root, address)
  const value = listed === null ? null : valueByPath(root, listed.path)
  const propertySlug = value === null ? null : textIn(value, PROPERTY_SLUG)
  if (propertySlug === null) {
    throw new Error(
      `\`${page}\` is counted from \`${named}\`, which names no property a day states a count under`
    )
  }
  return camelizeKey(propertySlug)
}

function countedOf(root: string, page: string, value: Value): Counted | null {
  const countedOn = countedOnIn(value.countedOn)
  if (countedOn === null) return null
  const wireKey = stated(value.wireKey)
  const countedFrom = stated(value.countedFrom)
  const countName = stated(value.countName)
  if (wireKey === undefined || countedFrom === undefined || countName === undefined) {
    throw new Error(
      `\`${page}\` states the day its count is read from and not the property and name it is read by`
    )
  }
  return { page, wireKey, countedOn, key: keyOf(root, countedFrom, page), countName }
}

export function countedReadouts(root: string): readonly Counted[] {
  const found: { readonly place: number; readonly one: Counted }[] = []
  for (const { path, value } of valuesOfType(root, READOUT)) {
    const one = countedOf(root, path, value)
    if (one !== null) found.push({ place: statedAt(value.place) ?? NO_PLACE, one })
  }
  return found.sort((one, two) => one.place - two.place).map((held) => held.one)
}

const NOTHING_TO_TAKE =
  "no inbox could be read, so there is no reading to take. A tile showing no signal is right " +
  "where a tile showing an inbox nobody counted would be a lie."

const SOME_STAND_STALE =
  "a readout nothing was kept for still holds the number kept before it, which is not the count now, " +
  "so this run did not succeed."

export type Taken = {
  readonly kept: Readonly<Record<string, number>>
  readonly unread: readonly string[]
}

function dayRow(
  root: string,
  date: string,
  keys: readonly string[],
  unread: string
): Readonly<Record<string, unknown>> | null {
  const query: Query = { pageTypeSlug: DAY, where: { [DATE]: { is: date } }, keys, limit: 1 }
  const asked = asking(root, query)
  if ("refused" in asked) throw new Error(`${unread}: ${asked.refused}`)
  return asked.rows[0] ?? null
}

type DayCounted = {
  readonly day: DayRead
  readonly date: string
  readonly readouts: readonly Counted[]
}

export async function takeReadings(root: string, now: Date = new Date()): Promise<Taken> {
  const counted = countedReadouts(root)
  const kept: Record<string, number> = {}
  const unread: string[] = []
  const wanting = (pages: readonly string[], why: string): undefined => {
    for (const page of pages) unread.push(`${page} — ${why}`)
    return undefined
  }
  const keep = (page: string, value: number | null, unstated: string): undefined => {
    if (value === null) return wanting([page], unstated)
    keepReading(root, page, value, now)
    kept[page] = value
    return undefined
  }

  const days: readonly DayCounted[] = DAYS_READ.map((on) => ({
    day: DAYS[on],
    date: DAYS[on].dateOn(now),
    readouts: counted.filter((one) => one.countedOn === on),
  })).filter((one) => one.readouts.length > 0)

  const rows = await Promise.allSettled(
    days.map(async (one) =>
      dayRow(
        root,
        one.date,
        one.readouts.map((readout) => readout.key),
        one.day.unread
      )
    )
  )

  days.forEach((one, at) => {
    const row = rows[at]
    const pages = one.readouts.map((readout) => readout.page)
    if (row === undefined) return
    if (row.status === "rejected") {
      wanting(pages, saidBy(row.reason))
    } else if (row.value === null) {
      wanting(pages, one.day.none(one.date))
    } else {
      const values = row.value
      for (const readout of one.readouts) {
        keep(
          readout.page,
          statedAt(values[readout.key]),
          one.day.noCount(one.date, readout.countName)
        )
      }
    }
  })

  return { kept, unread }
}

if (import.meta.main) {
  const root = rootStated(process.env) ?? process.cwd()
  try {
    const taken = await takeReadings(root)
    for (const one of taken.unread) process.stderr.write(`${one}\n`)
    const pages = Object.keys(taken.kept)
    if (pages.length === 0) {
      process.stderr.write(`${NOTHING_TO_TAKE}\n`)
      process.exit(2)
    }
    process.stdout.write(`${pages.length} inbox readings were taken and kept beside their pages\n`)
    if (taken.unread.length > 0) {
      process.stderr.write(`${SOME_STAND_STALE}\n`)
      process.exit(1)
    }
  } catch (thrown) {
    process.stderr.write(`${saidBy(thrown)}\n`)
    process.exit(1)
  }
}

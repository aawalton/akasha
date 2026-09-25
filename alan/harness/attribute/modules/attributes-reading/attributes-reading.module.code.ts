import { charismaIn } from "akasha/alan/attribute/pages/charisma/charisma.attribute.code.ts"
import { charisma } from "akasha/alan/attribute/pages/charisma/charisma.attribute.ts"
import { fetchConstitutionPoints } from "akasha/alan/attribute/pages/constitution/constitution.attribute.code.ts"
import { constitution } from "akasha/alan/attribute/pages/constitution/constitution.attribute.ts"
import { enduranceIn } from "akasha/alan/attribute/pages/endurance/endurance.attribute.code.ts"
import { endurance } from "akasha/alan/attribute/pages/endurance/endurance.attribute.ts"
import { intelligenceIn } from "akasha/alan/attribute/pages/intelligence/intelligence.attribute.code.ts"
import { intelligence } from "akasha/alan/attribute/pages/intelligence/intelligence.attribute.ts"
import { fetchLuckPoints } from "akasha/alan/attribute/pages/luck/luck.attribute.code.ts"
import { luck } from "akasha/alan/attribute/pages/luck/luck.attribute.ts"
import { strengthIn } from "akasha/alan/attribute/pages/strength/strength.attribute.code.ts"
import { strength } from "akasha/alan/attribute/pages/strength/strength.attribute.ts"
import { wisdomIn } from "akasha/alan/attribute/pages/wisdom/wisdom.attribute.code.ts"
import { wisdom } from "akasha/alan/attribute/pages/wisdom/wisdom.attribute.ts"
import { attributesReading } from "akasha/alan/harness/attribute/modules/attributes-reading/attributes-reading.module.ts"
import { getEsoDayStr } from "akasha/alan/harness/day-boundary/modules/eso-day/eso-day.module.code.ts"
import type {
  Asking,
  Row,
} from "akasha/alan/harness/readout/modules/asking/readout-asking.module.code.ts"
import {
  keepReading,
  readoutsServedBy,
} from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import {
  openedDayOf,
  openedDayWindow,
} from "akasha/alan/track/daily/modules/day-opening/day-opening.module.code.ts"
import { askDayByDate } from "akasha/alan/track/daily/modules/day-reading/day-reading.module.code.ts"
import { sessionsOfDay } from "akasha/alan/track/daily/modules/day-stretches/day-stretches.module.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { rootStated } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  AKASHA,
  resolveRoots,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { slugAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"

const SERVED_BY = namedAs(module.slug, attributesReading.slug, null)

const ATTRIBUTE = "attribute"

const NO_READOUT =
  "no readout counting this attribute names this module as serving it, so its reading is kept nowhere"

const ID = "id"

const AS_THE_STORE_ANSWERS: Readonly<Record<string, string>> = {
  "safety-level": "safetyLevel",
  "difficulty-level": "difficultyLevel",
  "started-at": "startedAt",
  "ended-at": "endedAt",
  relationships: "relationships",
}

const STRETCH_KEYS = Object.keys(AS_THE_STORE_ANSWERS)

const NOTHING_TO_TAKE =
  "no attribute could be read, so there is no reading to take. A tile showing no signal is right " +
  "where a tile showing points Alan did not earn would be a lie."

export type Taken = {
  readonly kept: Readonly<Record<string, number>>
  readonly unread: readonly string[]
}

async function trackedDay(day: string): Promise<Readonly<Record<string, unknown>> | null> {
  const asked = await askDayByDate(day)
  if (!asked.ok) {
    throw new Error(
      `the tracking day could not be read, so its attributes are unknown rather than nothing: ${asked.why}`
    )
  }
  return asked.rows[0]?.values ?? null
}

export function spelledBack(stretch: Readonly<Record<string, unknown>>): Row {
  const values: Record<string, unknown> = {}
  for (const [kept, answered] of Object.entries(AS_THE_STORE_ANSWERS)) {
    values[kept] = stretch[answered]
  }
  return { values }
}

async function charismaOf(day: Readonly<Record<string, unknown>>): Promise<number | null> {
  const dayId = day[ID]
  if (typeof dayId !== "string" || dayId.trim() === "") return null
  const stretches = await sessionsOfDay(dayId, STRETCH_KEYS)
  return charismaIn(stretches.map(spelledBack))
}

type Window = { readonly checkout: string; readonly from: string; readonly to: string }

function windowOpened(now: Date, unknown: string): Window {
  const here = resolveRoots()
  const window = openedDayWindow(here, openedDayOf(here, now))
  const checkout = here[AKASHA]
  if (checkout === undefined || checkout === "") throw new Error(unknown)
  return { checkout, from: window.from, to: window.to }
}

export function askingIn(root: string): Asking {
  return async (query) => {
    const asked = asking(root, query as never)
    if ("refused" in asked) return { ok: false, why: asked.refused }
    return { ok: true, rows: asked.rows.map((values) => ({ values })) }
  }
}

async function constitutionOf(now: Date): Promise<number> {
  const at = windowOpened(
    now,
    "no akasha checkout exists here, so the plants Alan ate are unknown rather than none"
  )
  return fetchConstitutionPoints(askingIn(at.checkout), at.from, at.to)
}

async function luckOf(now: Date): Promise<number> {
  const at = windowOpened(
    now,
    "no akasha checkout exists here, so the rejections Alan risked are unknown rather than none"
  )
  return fetchLuckPoints(askingIn(at.checkout), at.from, at.to)
}

export function attributeReadouts(root: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const { path, value } of readoutsServedBy(root, SERVED_BY)) {
    const attribute = slugAt(value, ATTRIBUTE)
    if (attribute !== null) found.set(attribute, path)
  }
  return found
}

const OFF_THE_DAY = [
  strength.slug,
  endurance.slug,
  wisdom.slug,
  intelligence.slug,
  charisma.slug,
] as const

const NO_DAY_KEPT = "no tracking day is kept for this day, so no attribute can be read off one"

async function readAttributes(now: Date = new Date()): Promise<Taken> {
  const kept: Record<string, number> = {}
  const unread: string[] = []
  const keep = (attribute: string, value: number | null): undefined => {
    if (value === null) {
      unread.push(`${attribute} — the tracking day carries nothing this attribute reads`)
      return undefined
    }
    kept[attribute] = value
    return undefined
  }

  const [day, constitutionRead, luckRead] = await Promise.allSettled([
    trackedDay(getEsoDayStr(now)),
    constitutionOf(now),
    luckOf(now),
  ])

  if (constitutionRead.status === "fulfilled") keep(constitution.slug, constitutionRead.value)
  else unread.push(`${constitution.slug} — ${saidBy(constitutionRead.reason)}`)

  if (luckRead.status === "fulfilled") keep(luck.slug, luckRead.value)
  else unread.push(`${luck.slug} — ${saidBy(luckRead.reason)}`)

  if (day.status === "rejected") {
    for (const attribute of OFF_THE_DAY) unread.push(`${attribute} — ${saidBy(day.reason)}`)
  } else if (day.value !== null) {
    const values = day.value
    keep(strength.slug, strengthIn(values))
    keep(endurance.slug, enduranceIn(values))
    keep(wisdom.slug, wisdomIn(values))
    keep(intelligence.slug, intelligenceIn(values))

    const [charismaRead] = await Promise.allSettled([charismaOf(values)])
    if (charismaRead.status === "fulfilled") keep(charisma.slug, charismaRead.value)
    else unread.push(`${charisma.slug} — ${saidBy(charismaRead.reason)}`)
  } else {
    for (const attribute of OFF_THE_DAY) unread.push(`${attribute} — ${NO_DAY_KEPT}`)
  }

  return { kept, unread }
}

export async function takeReadings(
  root: string,
  now: Date = new Date(),
  done: string[] = []
): Promise<Taken> {
  const read = await readAttributes(now)
  const readouts = attributeReadouts(root)
  const kept: Record<string, number> = {}
  const unread = [...read.unread]
  for (const [attribute, value] of Object.entries(read.kept)) {
    const page = readouts.get(attribute)
    if (page === undefined) {
      unread.push(`${attribute} — ${NO_READOUT}`)
      continue
    }
    keepReading(root, page, value, now)
    kept[page] = value
    done.push(`${page} carries the reading taken today`)
  }
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
    process.stdout.write(
      `${pages.length} attribute readings were taken and kept beside their pages\n`
    )
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}

import { keepPointsToday } from "akasha/alan/attribute/modules/points/attribute-points.module.code.ts"
import { charismaIn } from "akasha/alan/attribute/pages/charisma/charisma.attribute.code.ts"
import { fetchConstitutionPoints } from "akasha/alan/attribute/pages/constitution/constitution.attribute.code.ts"
import { enduranceIn } from "akasha/alan/attribute/pages/endurance/endurance.attribute.code.ts"
import { intelligenceIn } from "akasha/alan/attribute/pages/intelligence/intelligence.attribute.code.ts"
import { fetchLuckPoints } from "akasha/alan/attribute/pages/luck/luck.attribute.code.ts"
import { strengthIn } from "akasha/alan/attribute/pages/strength/strength.attribute.code.ts"
import { wisdomIn } from "akasha/alan/attribute/pages/wisdom/wisdom.attribute.code.ts"
import { attributeCharisma } from "akasha/alan/attribute/readout/attribute-charisma/attribute-charisma.readout.ts"
import { attributeConstitution } from "akasha/alan/attribute/readout/attribute-constitution/attribute-constitution.readout.ts"
import { attributeEndurance } from "akasha/alan/attribute/readout/attribute-endurance/attribute-endurance.readout.ts"
import { attributeIntelligence } from "akasha/alan/attribute/readout/attribute-intelligence/attribute-intelligence.readout.ts"
import { attributeLuck } from "akasha/alan/attribute/readout/attribute-luck/attribute-luck.readout.ts"
import { attributeStrength } from "akasha/alan/attribute/readout/attribute-strength/attribute-strength.readout.ts"
import { attributeWisdom } from "akasha/alan/attribute/readout/attribute-wisdom/attribute-wisdom.readout.ts"
import { getEsoDayStr } from "akasha/alan/harness/day-boundary/modules/eso-day/eso-day.module.code.ts"
import { askingIn } from "akasha/alan/harness/plant/modules/plants-reading/plants-reading.module.code.ts"
import type { Row } from "akasha/alan/harness/readout/modules/asking/readout-asking.module.code.ts"
import { keepReading } from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import {
  openedDayOf,
  openedDayWindow,
} from "akasha/alan/track/daily/modules/day-opening/day-opening.module.code.ts"
import { askDayByDate } from "akasha/alan/track/daily/modules/day-reading/day-reading.module.code.ts"
import { sessionsOfDay } from "akasha/alan/track/daily/modules/day-stretches/day-stretches.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { rootStated } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  AKASHA,
  resolveRoots,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const READOUTS = "alan/attribute/readout"

export const STRENGTH_PAGE = `${READOUTS}/attribute-strength/attribute-strength.readout.ts`

export const ENDURANCE_PAGE = `${READOUTS}/attribute-endurance/attribute-endurance.readout.ts`

export const CONSTITUTION_PAGE = `${READOUTS}/attribute-constitution/attribute-constitution.readout.ts`

export const WISDOM_PAGE = `${READOUTS}/attribute-wisdom/attribute-wisdom.readout.ts`

export const INTELLIGENCE_PAGE = `${READOUTS}/attribute-intelligence/attribute-intelligence.readout.ts`

export const CHARISMA_PAGE = `${READOUTS}/attribute-charisma/attribute-charisma.readout.ts`

export const LUCK_PAGE = `${READOUTS}/attribute-luck/attribute-luck.readout.ts`

const ID = "id"

const AS_THE_STORE_ANSWERS: Readonly<Record<string, string>> = {
  "safety-level": "safetyLevel",
  "difficulty-level": "difficultyLevel",
  "start-time": "startTime",
  "end-time": "endTime",
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

export const ATTRIBUTE_OF: Readonly<Record<string, string>> = {
  [STRENGTH_PAGE]: slugOf(attributeStrength.attribute),
  [ENDURANCE_PAGE]: slugOf(attributeEndurance.attribute),
  [CONSTITUTION_PAGE]: slugOf(attributeConstitution.attribute),
  [WISDOM_PAGE]: slugOf(attributeWisdom.attribute),
  [INTELLIGENCE_PAGE]: slugOf(attributeIntelligence.attribute),
  [CHARISMA_PAGE]: slugOf(attributeCharisma.attribute),
  [LUCK_PAGE]: slugOf(attributeLuck.attribute),
}

const OFF_THE_DAY = [
  STRENGTH_PAGE,
  ENDURANCE_PAGE,
  WISDOM_PAGE,
  INTELLIGENCE_PAGE,
  CHARISMA_PAGE,
] as const

const NO_DAY_KEPT = "no tracking day is kept for this day, so no attribute can be read off one"

async function readAttributes(now: Date = new Date()): Promise<Taken> {
  const kept: Record<string, number> = {}
  const unread: string[] = []
  const keep = (page: string, value: number | null): undefined => {
    if (value === null) {
      unread.push(`${page} — the tracking day carries nothing this attribute reads`)
      return undefined
    }
    kept[page] = value
    return undefined
  }

  const [day, constitution, luck] = await Promise.allSettled([
    trackedDay(getEsoDayStr(now)),
    constitutionOf(now),
    luckOf(now),
  ])

  if (constitution.status === "fulfilled") keep(CONSTITUTION_PAGE, constitution.value)
  else unread.push(`${CONSTITUTION_PAGE} — ${saidBy(constitution.reason)}`)

  if (luck.status === "fulfilled") keep(LUCK_PAGE, luck.value)
  else unread.push(`${LUCK_PAGE} — ${saidBy(luck.reason)}`)

  if (day.status === "rejected") {
    for (const page of OFF_THE_DAY) unread.push(`${page} — ${saidBy(day.reason)}`)
  } else if (day.value !== null) {
    const values = day.value
    keep(STRENGTH_PAGE, strengthIn(values))
    keep(ENDURANCE_PAGE, enduranceIn(values))
    keep(WISDOM_PAGE, wisdomIn(values))
    keep(INTELLIGENCE_PAGE, intelligenceIn(values))

    const [charisma] = await Promise.allSettled([charismaOf(values)])
    if (charisma.status === "fulfilled") keep(CHARISMA_PAGE, charisma.value)
    else unread.push(`${CHARISMA_PAGE} — ${saidBy(charisma.reason)}`)
  } else {
    for (const page of OFF_THE_DAY) unread.push(`${page} — ${NO_DAY_KEPT}`)
  }

  return { kept, unread }
}

export async function takeReadings(
  root: string,
  now: Date = new Date(),
  done: string[] = []
): Promise<Taken> {
  const taken = await readAttributes(now)
  for (const [page, value] of Object.entries(taken.kept)) {
    keepReading(root, page, value, now)
    done.push(`${page} carries the reading taken today`)
    const slug = ATTRIBUTE_OF[page]
    if (slug === undefined) continue
    keepPointsToday(root, slug, value)
    done.push(`${slug} carries its points from today`)
  }
  return taken
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

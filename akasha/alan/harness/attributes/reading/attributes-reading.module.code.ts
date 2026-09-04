import { getEsoDayStr } from "@akasha/day/eso-day"
import { AKASHA, resolveRoots } from "@akasha/pages-system/checkout-roots"
import { charismaIn } from "@akasha/readout-system/attribute-charisma"
import { fetchConstitutionPoints } from "@akasha/readout-system/attribute-constitution"
import { enduranceIn } from "@akasha/readout-system/attribute-endurance"
import { intelligenceIn } from "@akasha/readout-system/attribute-intelligence"
import { strengthIn } from "@akasha/readout-system/attribute-strength"
import { wisdomIn } from "@akasha/readout-system/attribute-wisdom"
import type { Row } from "@akasha/readout-system/readout-asking"
import { keepReading } from "@akasha/readout-system/readout-reading"
import { askDayByDate, sessionsOfDay } from "@tools/lib/tracking/day-place"
import { wakeDayOf, wakeDayWindow } from "@tools/lib/wake-day"
import { askingIn } from "../../plants/reading/plants-reading.module.code.ts"

const READOUTS = "akasha/readout-system/readouts/pages"

export const STRENGTH_PAGE = `${READOUTS}/attribute-strength/attribute-strength.readout.ts`

export const ENDURANCE_PAGE = `${READOUTS}/attribute-endurance/attribute-endurance.readout.ts`

export const CONSTITUTION_PAGE = `${READOUTS}/attribute-constitution/attribute-constitution.readout.ts`

export const WISDOM_PAGE = `${READOUTS}/attribute-wisdom/attribute-wisdom.readout.ts`

export const INTELLIGENCE_PAGE = `${READOUTS}/attribute-intelligence/attribute-intelligence.readout.ts`

export const CHARISMA_PAGE = `${READOUTS}/attribute-charisma/attribute-charisma.readout.ts`

const ID = "id"

const AS_THE_STORE_ANSWERS: Readonly<Record<string, string>> = {
  "safety-level": "safetyLevel",
  "difficulty-level": "difficultyLevel",
  "start-time": "startTime",
  "end-time": "endTime",
}

const STRETCH_KEYS = Object.keys(AS_THE_STORE_ANSWERS)

export const NOTHING_TO_TAKE =
  "no attribute could be read, so there is no reading to take. A tile showing no signal is right " +
  "where a tile showing points Alan did not earn would be a lie."

export type Taken = {
  readonly kept: Readonly<Record<string, number>>
  readonly unread: readonly string[]
}

function whyOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
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

function spelledBack(stretch: Readonly<Record<string, unknown>>): Row {
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

async function constitutionOf(now: Date): Promise<number> {
  const here = resolveRoots()
  const window = wakeDayWindow(here, wakeDayOf(here, now))
  const checkout = here[AKASHA]
  if (checkout === undefined || checkout === "") {
    throw new Error(
      "no akasha checkout stands here, so the plants Alan ate are unknown rather than none"
    )
  }
  return fetchConstitutionPoints(askingIn(checkout), window.from, window.to)
}

export async function takeReadings(root: string, now: Date = new Date()): Promise<Taken> {
  const kept: Record<string, number> = {}
  const unread: string[] = []
  const keep = (page: string, value: number | null): undefined => {
    if (value === null) return undefined
    keepReading(root, page, value, now)
    kept[page] = value
    return undefined
  }
  const wanting = (pages: readonly string[], why: string): undefined => {
    for (const page of pages) unread.push(`${page} — ${why}`)
    return undefined
  }

  const [day, constitution] = await Promise.allSettled([
    trackedDay(getEsoDayStr(now)),
    constitutionOf(now),
  ])

  if (constitution.status === "fulfilled") keep(CONSTITUTION_PAGE, constitution.value)
  else wanting([CONSTITUTION_PAGE], whyOf(constitution.reason))

  if (day.status === "rejected") {
    wanting(
      [STRENGTH_PAGE, ENDURANCE_PAGE, WISDOM_PAGE, INTELLIGENCE_PAGE, CHARISMA_PAGE],
      whyOf(day.reason)
    )
  } else if (day.value !== null) {
    const values = day.value
    keep(STRENGTH_PAGE, strengthIn(values))
    keep(ENDURANCE_PAGE, enduranceIn(values))
    keep(WISDOM_PAGE, wisdomIn(values))
    keep(INTELLIGENCE_PAGE, intelligenceIn(values))

    const [charisma] = await Promise.allSettled([charismaOf(values)])
    if (charisma.status === "fulfilled") keep(CHARISMA_PAGE, charisma.value)
    else wanting([CHARISMA_PAGE], whyOf(charisma.reason))
  }

  return { kept, unread }
}

if (import.meta.main) {
  const root = process.env.AKASHA_ROOT ?? process.cwd()
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

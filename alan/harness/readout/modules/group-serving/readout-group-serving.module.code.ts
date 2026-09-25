import type { ReadoutWords } from "akasha/alan/harness/readout/modules/body/readout-body.module.code.ts"
import { READOUT_CACHE_CONTROL } from "akasha/alan/harness/readout/modules/credential/readout-credential.module.code.ts"
import { stated } from "akasha/alan/harness/readout/modules/none-left/readout-none-left.module.code.ts"
import {
  type HeldReading,
  noReading,
  type RingAdmission,
  readingHeldOn,
  wordsOn,
} from "akasha/alan/harness/readout/modules/serving/readout-serving.module.code.ts"
import {
  BELOW_EVERY_RUNG,
  type Rung,
  readingSaid,
  rungsIn,
  statedAt,
  type TierColor,
  tierAt,
} from "akasha/alan/harness/readout/modules/tier/readout-tier.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  askingFor,
  type Fetcher,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const READOUT = "readout"

const READOUT_SCALE = "readout-scale"

const READOUT_GROUP = "readout-group"

export const HABIT = "habit"

const NO_FIGURE = ""

export type ReadingUnheld = "none"

export type Stoplight = {
  readonly label: string
  readonly unit?: string
  readonly tier: TierColor
  readonly reading: string
  readonly readingHeld?: ReadingUnheld
  readonly nextTier?: TierColor
  readonly progress?: number
  readonly figureOffScale?: boolean
  readonly takenAt?: string
  readonly fallsPerHour?: number
  readonly rungs?: readonly Rung[]
  readonly coloredWith?: ColoredWith
}

export type ColoredWith = Pick<Stoplight, "tier" | "reading" | "takenAt" | "fallsPerHour" | "rungs">

export type Stoplighted = Stoplight & Readonly<Record<string, unknown>>

export type Values = Readonly<Record<string, unknown>>

export type ReadingHeld = (row: Values) => HeldReading

export function inPlaceOrder(rows: readonly Values[]): readonly Values[] {
  return [...rows].sort((one, two) => (statedAt(one.place) ?? 0) - (statedAt(two.place) ?? 0))
}

function scaleSlugIn(row: Values): string | undefined {
  const held = stated(row.scale)
  return held === undefined ? undefined : slugOf(held)
}

export function wireKeyed(wireKeyName: string, wireKey: string): Readonly<Record<string, string>> {
  return { [wireKeyName]: wireKey }
}

export function unitAnswered(row: Values): Pick<Stoplight, "unit"> {
  const { unit } = wordsOn(row)
  return unit === undefined ? {} : { unit }
}

function fallingWith(
  reading: Extract<HeldReading, { held: "fresh" }>,
  rungs: readonly Rung[]
): Pick<Stoplight, "takenAt" | "fallsPerHour" | "rungs"> {
  if (reading.fallsPerHour === 0) return {}
  return {
    takenAt: reading.at,
    fallsPerHour: reading.fallsPerHour,
    ...(rungs.length === 0 ? {} : { rungs }),
  }
}

async function rungsOf(scaleSlug: string, fetcher?: Fetcher): Promise<readonly Rung[]> {
  const asked = await askingFor(
    {
      pageTypeSlug: READOUT_SCALE,
      where: { slug: { is: scaleSlug } },
    },
    fetcher
  )
  if ("refused" in asked) return []
  const [row] = asked.rows
  return row === undefined ? [] : rungsIn(row)
}

export function stoplightWith(
  row: Values,
  rungs: readonly Rung[],
  wireKeyName: string = HABIT,
  readingHeld: ReadingHeld = readingHeldOn
): Stoplighted | null {
  const slug = stated(row.slug)
  const label = stated(row.label)
  const scaleSlug = scaleSlugIn(row)
  if (slug === undefined || label === undefined || scaleSlug === undefined) return null

  const wireKey = stated(row.wireKey)
  if (wireKey === undefined) return null

  const reading = readingHeld(row)
  if (reading.held !== "fresh") {
    return {
      ...wireKeyed(wireKeyName, wireKey),
      label,
      ...unitAnswered(row),
      tier: BELOW_EVERY_RUNG,
      reading: NO_FIGURE,
      readingHeld: reading.held,
    }
  }

  const reached = tierAt(reading.value, rungs)
  if (reached === null) return null

  return {
    ...wireKeyed(wireKeyName, wireKey),
    label,
    ...unitAnswered(row),
    tier: reached.tier,
    reading: readingSaid(reading.value),
    ...(reached.nextTier === null ? {} : { nextTier: reached.nextTier }),
    ...(reached.progress === null ? {} : { progress: reached.progress }),
    ...fallingWith(reading, rungs),
  }
}

export async function stoplightOf(
  row: Values,
  wireKeyName: string = HABIT,
  readingHeld: ReadingHeld = readingHeldOn,
  fetcher?: Fetcher
): Promise<Stoplighted | null> {
  const scaleSlug = scaleSlugIn(row)
  if (scaleSlug === undefined) return null
  const reading = readingHeld(row)
  const rungs = reading.held === "fresh" ? await rungsOf(scaleSlug, fetcher) : []
  return stoplightWith(row, rungs, wireKeyName, () => reading)
}

export function stilled(row: Values): boolean {
  return row.enabled === false
}

async function figureOffScaleOf(groupSlug: string, fetcher?: Fetcher): Promise<boolean> {
  const asked = await askingFor(
    {
      pageTypeSlug: READOUT_GROUP,
      where: { slug: { is: groupSlug } },
    },
    fetcher
  )
  if ("refused" in asked) return false
  const [row] = asked.rows
  return row?.figureOffScale === true
}

export async function stoplightsInGroup(
  groupSlug: string,
  wireKeyName: string = HABIT,
  readingHeld: ReadingHeld = readingHeldOn,
  fetcher?: Fetcher
): Promise<readonly Stoplighted[]> {
  const asked = await askingFor(
    {
      pageTypeSlug: READOUT,
      where: { groups: { has: namedAs(READOUT_GROUP, groupSlug, null) } },
    },
    fetcher
  )
  if ("refused" in asked) return []

  const figureOffScale = await figureOffScaleOf(groupSlug, fetcher)

  const stoplights: Stoplighted[] = []
  for (const row of inPlaceOrder(asked.rows)) {
    if (stilled(row)) continue
    const one = await stoplightOf(row, wireKeyName, readingHeld, fetcher)
    if (one !== null) stoplights.push(figureOffScale ? { ...one, figureOffScale } : one)
  }
  return stoplights
}

export type WordsByWireKey = Readonly<Record<string, ReadoutWords>>

export async function wordsInGroup(groupSlug: string, fetcher?: Fetcher): Promise<WordsByWireKey> {
  const asked = await askingFor(
    {
      pageTypeSlug: READOUT,
      where: { groups: { has: namedAs(READOUT_GROUP, groupSlug, null) } },
    },
    fetcher
  )
  if ("refused" in asked) return {}

  const words: Record<string, ReadoutWords> = {}
  for (const row of asked.rows) {
    if (stilled(row)) continue
    const wireKey = stated(row.wireKey)
    if (wireKey !== undefined) words[wireKey] = wordsOn(row)
  }
  return words
}

export async function answerStoplightsAdmittedBy(
  request: Request,
  admit: RingAdmission,
  groupSlug: string,
  wireKeyName: string = HABIT
): Promise<Response> {
  const refusal = await admit(request)
  if (refusal !== null) return refusal

  const stoplights = await stoplightsInGroup(groupSlug, wireKeyName)
  if (stoplights.length === 0) return noReading()

  return Response.json({ stoplights }, { headers: { "Cache-Control": READOUT_CACHE_CONTROL } })
}

import { askingFor } from "@akasha/pages-system-service/calling"
import { READOUT_CACHE_CONTROL } from "../readout-credential/readout-credential.module.code.ts"
import { stated } from "../readout-none-left/readout-none-left.module.code.ts"
import {
  type HeldReading,
  noReading,
  type RingAdmission,
  readingHeldFor,
} from "../readout-serving/readout-serving.module.code.ts"
import {
  BELOW_EVERY_RUNG,
  type Rung,
  readingSaid,
  rungsIn,
  statedAt,
  type TierColor,
  tierAt,
} from "../readout-tier/readout-tier.module.code.ts"

const READOUT = "readout"

const READOUT_SCALE = "readout-scale"

const HABIT = "habit"

const NO_FIGURE = ""

export type ReadingUnheld = "none" | "stale"

export type Stoplight = {
  readonly habit?: string
  readonly label: string
  readonly tier: TierColor
  readonly reading: string
  readonly readingHeld?: ReadingUnheld
  readonly nextTier?: TierColor
  readonly progress?: number
}

type Values = Readonly<Record<string, unknown>>

export type ReadingHeld = (row: Values) => HeldReading

export function relayedReading(row: Values): HeldReading {
  return readingHeldFor(stated(row.slug) ?? "")
}

export function inPlaceOrder(rows: readonly Values[]): readonly Values[] {
  return [...rows].sort((one, two) => (statedAt(one.place) ?? 0) - (statedAt(two.place) ?? 0))
}

function wireKeyed(wireKeyName: string, wireKey: string): Pick<Stoplight, "habit"> {
  return { [wireKeyName]: wireKey }
}

async function rungsOf(scaleSlug: string): Promise<readonly Rung[]> {
  const asked = await askingFor({
    pageTypeSlug: READOUT_SCALE,
    where: { slug: { is: scaleSlug } },
  })
  if ("refused" in asked) return []
  const [row] = asked.rows
  return row === undefined ? [] : rungsIn(row)
}

export async function stoplightOf(
  row: Values,
  wireKeyName: string = HABIT,
  readingHeld: ReadingHeld = relayedReading
): Promise<Stoplight | null> {
  const slug = stated(row.slug)
  const label = stated(row.label)
  const scaleSlug = stated(row.scaleSlug)
  if (slug === undefined || label === undefined || scaleSlug === undefined) return null

  const wireKey = stated(row.wireKey)
  if (wireKey === undefined) return null

  const reading = readingHeld(row)
  if (reading.held !== "fresh") {
    return {
      ...wireKeyed(wireKeyName, wireKey),
      label,
      tier: BELOW_EVERY_RUNG,
      reading: NO_FIGURE,
      readingHeld: reading.held,
    }
  }

  const reached = tierAt(reading.value, await rungsOf(scaleSlug))
  if (reached === null) return null

  return {
    ...wireKeyed(wireKeyName, wireKey),
    label,
    tier: reached.tier,
    reading: readingSaid(reading.value, stated(row.figureFormat)),
    ...(reached.nextTier === null ? {} : { nextTier: reached.nextTier }),
    ...(reached.progress === null ? {} : { progress: reached.progress }),
  }
}

export function stilled(row: Values): boolean {
  return row.enabled === false
}

export async function stoplightsInGroup(
  groupSlug: string,
  wireKeyName: string = HABIT,
  readingHeld: ReadingHeld = relayedReading
): Promise<readonly Stoplight[]> {
  const asked = await askingFor({
    pageTypeSlug: READOUT,
    where: { groupSlugs: { has: groupSlug } },
  })
  if ("refused" in asked) return []

  const stoplights: Stoplight[] = []
  for (const row of inPlaceOrder(asked.rows)) {
    if (stilled(row)) continue
    const one = await stoplightOf(row, wireKeyName, readingHeld)
    if (one !== null) stoplights.push(one)
  }
  return stoplights
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

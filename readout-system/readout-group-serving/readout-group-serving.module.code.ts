import { askingFor } from "@akasha/pages-service/calling"
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

const READOUT_GROUP = "readout-group"

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
  readonly figureOffScale?: boolean
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

// WHETHER A READING PAST EITHER END OF ITS SCALE STILL DRAWS ITS FIGURE BELONGS TO THE GROUP.
//
// One readout is drawn in more than one group: safety is drawn alone on a tile of its own and again
// among the upkeep stoplights, and those two drawings answer this differently. A tile drawing one
// reading has room for the figure at every reading; six readings to a tile has room for none past
// the ends. So the readout cannot carry the answer and the group can, one answer to each drawing.
//
// A group stating nothing draws no figure past either end, which is what every group did before any
// group stated anything.
async function figureOffScaleOf(groupSlug: string): Promise<boolean> {
  const asked = await askingFor({
    pageTypeSlug: READOUT_GROUP,
    where: { slug: { is: groupSlug } },
  })
  if ("refused" in asked) return false
  const [row] = asked.rows
  return row?.figureOffScale === true
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

  // The group is asked for once for the group rather than once for each reading in it, and the
  // answer is carried on each reading because each reading is what a ring is handed.
  const figureOffScale = await figureOffScaleOf(groupSlug)

  const stoplights: Stoplight[] = []
  for (const row of inPlaceOrder(asked.rows)) {
    if (stilled(row)) continue
    const one = await stoplightOf(row, wireKeyName, readingHeld)
    if (one !== null) stoplights.push(figureOffScale ? { ...one, figureOffScale } : one)
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

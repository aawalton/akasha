import { costColorAt } from "akasha/alan/harness/cost/modules/color/cost-color.module.code.ts"
import { READOUT_CACHE_CONTROL } from "akasha/alan/harness/readout/modules/credential/readout-credential.module.code.ts"
import {
  type ColoredWith,
  groupStated,
  inPlaceOrder,
  type ReadingHeld,
  type Stoplight,
  type Stoplighted,
  stilled,
  stoplightOf,
  unitAnswered,
  type Values,
  wireKeyed,
} from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.code.ts"
import { stated } from "akasha/alan/harness/readout/modules/none-left/readout-none-left.module.code.ts"
import {
  noReading,
  type RingAdmission,
  readingHeldOn,
} from "akasha/alan/harness/readout/modules/serving/readout-serving.module.code.ts"
import {
  BELOW_EVERY_RUNG,
  readingSaid,
} from "akasha/alan/harness/readout/modules/tier/readout-tier.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const READOUT = "readout"

const READOUT_GROUP = "readout-group"

const COST_GROUP_SLUG = "cost"

const COST_GROUP = namedAs(READOUT_GROUP, COST_GROUP_SLUG, null)

const NO_FIGURE = ""

type SurplusNow = {
  readonly stoplight: Stoplighted | null
  readonly hours: number | null
}

async function surplusNow(
  cost: Values,
  wireKeyName: string,
  readingHeld: ReadingHeld = readingHeldOn
): Promise<SurplusNow | null> {
  const colorFrom = stated(cost.colorFrom)
  if (colorFrom === undefined) return null

  const asked = await askingFor({
    pageTypeSlug: READOUT,
    where: { slug: { is: slugOf(colorFrom) } },
  })
  if ("refused" in asked) return null

  const [row] = asked.rows
  if (row === undefined) return null

  const reading = readingHeld(row)
  const stoplight = await stoplightOf(row, wireKeyName, () => reading)
  return { stoplight, hours: reading.held === "fresh" ? reading.value : null }
}

function countingDown(cost: number, surplus: Stoplight | null): Pick<Stoplight, "coloredWith"> {
  if (!(cost > 0) || surplus === null) return {}
  if (surplus.readingHeld !== undefined) return {}
  return { coloredWith: coloredWithOf(surplus) }
}

function coloredWithOf(surplus: Stoplight): ColoredWith {
  const { tier, reading, takenAt, fallsPerHour, rungs } = surplus
  return {
    tier,
    reading,
    ...(takenAt === undefined ? {} : { takenAt }),
    ...(fallsPerHour === undefined ? {} : { fallsPerHour }),
    ...(rungs === undefined ? {} : { rungs }),
  }
}

function costStoplightWith(
  row: Values,
  wireKeyName: string,
  surplus: SurplusNow | null,
  readingHeld: ReadingHeld = readingHeldOn
): Stoplighted | null {
  const label = stated(row.label)
  const wireKey = stated(row.wireKey)
  if (label === undefined || wireKey === undefined) return null

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

  return {
    ...wireKeyed(wireKeyName, wireKey),
    label,
    ...unitAnswered(row),
    tier: costColorAt(reading.value, surplus?.hours ?? null),
    reading: readingSaid(reading.value),
    ...countingDown(reading.value, surplus?.stoplight ?? null),
  }
}

export async function costStoplights(
  readingHeld: ReadingHeld = readingHeldOn
): Promise<readonly Stoplighted[]> {
  const { wireKeyName } = await groupStated(COST_GROUP_SLUG)
  if (wireKeyName === null) return []

  const asked = await askingFor({
    pageTypeSlug: READOUT,
    where: { groups: { has: COST_GROUP } },
  })
  if ("refused" in asked) return []

  const stoplights: Stoplighted[] = []
  for (const row of inPlaceOrder(asked.rows)) {
    if (stilled(row)) continue
    const surplus = await surplusNow(row, wireKeyName, readingHeld)
    const one = costStoplightWith(row, wireKeyName, surplus, readingHeld)
    if (one !== null) stoplights.push(one)
  }
  return stoplights
}

export async function answerCostAdmittedBy(
  request: Request,
  admit: RingAdmission
): Promise<Response> {
  const refusal = await admit(request)
  if (refusal !== null) return refusal

  const stoplights = await costStoplights()
  if (stoplights.length === 0) return noReading()

  return Response.json({ stoplights }, { headers: { "Cache-Control": READOUT_CACHE_CONTROL } })
}

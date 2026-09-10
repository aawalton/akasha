import { askingFor } from "akasha/pages/service/page-calling/page-calling.module.code.ts"
import { READOUT_CACHE_CONTROL } from "akasha/readouts/credential/readout-credential.module.code.ts"
import {
  HABIT,
  inPlaceOrder,
  type ReadingHeld,
  relayedReading,
  type Stoplight,
  stilled,
  stoplightOf,
  type Values,
} from "akasha/readouts/group-serving/readout-group-serving.module.code.ts"
import { stated } from "akasha/readouts/none-left/readout-none-left.module.code.ts"
import {
  noReading,
  type RingAdmission,
} from "akasha/readouts/serving/readout-serving.module.code.ts"
import { BELOW_EVERY_RUNG, readingSaid } from "akasha/readouts/tier/readout-tier.module.code.ts"
import { costColorAt } from "../color/cost-color.module.code.ts"

const READOUT = "readout"

export const COST_GROUP = "cost"

export const SURPLUS_READOUT = "upkeep-surplus"

const NO_FIGURE = ""

export async function surplusNow(
  readingHeld: ReadingHeld = relayedReading
): Promise<Stoplight | null> {
  const asked = await askingFor({
    pageTypeSlug: READOUT,
    where: { slug: { is: SURPLUS_READOUT } },
  })
  if ("refused" in asked) return null

  const [row] = asked.rows
  if (row === undefined) return null

  return await stoplightOf(row, HABIT, readingHeld)
}

export function countingDown(
  cost: number,
  surplus: Stoplight | null
): Pick<Stoplight, "coloredWith"> {
  if (!(cost > 0) || surplus === null) return {}
  if (surplus.readingHeld !== undefined) return {}
  return { coloredWith: surplus }
}

export function costStoplightWith(
  row: Values,
  surplus: Stoplight | null,
  readingHeld: ReadingHeld = relayedReading
): Stoplight | null {
  const label = stated(row.label)
  const wireKey = stated(row.wireKey)
  if (label === undefined || wireKey === undefined) return null

  const reading = readingHeld(row)
  if (reading.held !== "fresh") {
    return {
      habit: wireKey,
      label,
      tier: BELOW_EVERY_RUNG,
      reading: NO_FIGURE,
      readingHeld: reading.held,
    }
  }

  return {
    habit: wireKey,
    label,
    tier: costColorAt(reading.value, surplus?.tier ?? null),
    reading: readingSaid(reading.value),
    ...countingDown(reading.value, surplus),
  }
}

export async function costStoplights(
  readingHeld: ReadingHeld = relayedReading
): Promise<readonly Stoplight[]> {
  const asked = await askingFor({
    pageTypeSlug: READOUT,
    where: { groups: { has: COST_GROUP } },
  })
  if ("refused" in asked) return []

  const surplus = await surplusNow(readingHeld)

  const stoplights: Stoplight[] = []
  for (const row of inPlaceOrder(asked.rows)) {
    if (stilled(row)) continue
    const one = costStoplightWith(row, surplus, readingHeld)
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

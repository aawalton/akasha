import { askingFor } from "@akasha/pages-system-service/calling"
import { READOUT_CACHE_CONTROL } from "../readout-credential/readout-credential.module.code.ts"
import { stated } from "../readout-none-left/readout-none-left.module.code.ts"
import {
  noReading,
  type RingAdmission,
  relayedFresh,
} from "../readout-serving/readout-serving.module.code.ts"
import {
  type Rung,
  readingSaid,
  rungsIn,
  statedAt,
  type TierColor,
  tierAt,
} from "../readout-tier/readout-tier.module.code.ts"

const READOUT = "readout"

const READOUT_SCALE = "readout-scale"

export type Stoplight = {
  readonly habit?: string
  readonly label: string
  readonly tier: TierColor
  readonly reading: string
  readonly nextTier?: TierColor
  readonly progress?: number
}

type Values = Readonly<Record<string, unknown>>

export function inPlaceOrder(rows: readonly Values[]): readonly Values[] {
  return [...rows].sort((one, two) => (statedAt(one.place) ?? 0) - (statedAt(two.place) ?? 0))
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

export async function stoplightOf(row: Values): Promise<Stoplight | null> {
  const slug = stated(row.slug)
  const label = stated(row.label)
  const scaleSlug = stated(row.scaleSlug)
  if (slug === undefined || label === undefined || scaleSlug === undefined) return null

  const value = relayedFresh(slug)
  if (value === null) return null

  const reached = tierAt(value, await rungsOf(scaleSlug))
  if (reached === null) return null

  const wireKey = stated(row.wireKey)
  return {
    ...(wireKey === undefined ? {} : { habit: wireKey }),
    label,
    tier: reached.tier,
    reading: readingSaid(value, stated(row.figureFormat)),
    ...(reached.nextTier === null ? {} : { nextTier: reached.nextTier }),
    ...(reached.progress === null ? {} : { progress: reached.progress }),
  }
}

export async function answerStoplightsAdmittedBy(
  request: Request,
  admit: RingAdmission,
  groupSlug: string
): Promise<Response> {
  const refusal = await admit(request)
  if (refusal !== null) return refusal

  const asked = await askingFor({
    pageTypeSlug: READOUT,
    where: { groupSlugs: { has: groupSlug } },
  })
  if ("refused" in asked) return noReading()

  const stoplights: Stoplight[] = []
  for (const row of inPlaceOrder(asked.rows)) {
    const one = await stoplightOf(row)
    if (one !== null) stoplights.push(one)
  }
  if (stoplights.length === 0) return noReading()

  return Response.json({ stoplights }, { headers: { "Cache-Control": READOUT_CACHE_CONTROL } })
}

import { incrementProperty } from "akasha/page/access/modules/increment-property/increment-property.module.code.ts"

const PAGE_TYPE = "readout-widget"

const TAPS = "taps"

const LAST_TAPPED_AT = "lastTappedAt"

export type Tapped = {
  readonly taps: number
  readonly at: string
}

export async function countTap(
  slug: string,
  at: Date,
  increment: typeof incrementProperty = incrementProperty
): Promise<Tapped | null> {
  const moment = at.toISOString()
  const taps = await increment({
    pageTypeSlug: PAGE_TYPE,
    where: [{ key: "slug", eq: slug }],
    key: TAPS,
    set: { [LAST_TAPPED_AT]: moment },
  })
  return taps === null ? null : { taps, at: moment }
}

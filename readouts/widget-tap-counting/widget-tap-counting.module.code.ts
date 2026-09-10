import { getPage } from "@akasha/pages/access/get"
import { patchPage } from "@akasha/pages/access/patch"
import type { PageWhere } from "@akasha/pages/core/page-types"

const PAGE_TYPE = "readout-widget"

const TAPS = "taps"

const LAST_TAPPED_AT = "lastTappedAt"

export type Tapped = {
  readonly taps: number
  readonly at: string
}

export function tapsOn(values: Readonly<Record<string, unknown>>): number {
  const taps = values[TAPS]
  if (taps === undefined || taps === null) return 0
  if (typeof taps !== "number") {
    throw new Error(
      `the widget '${String(values["slug"])}' carries a tap count that is no number, so how ` +
        "often that widget was tapped is unknown rather than never"
    )
  }
  return taps
}

export async function countTap(slug: string, at: Date): Promise<Tapped | null> {
  const where: PageWhere = [{ key: "slug", eq: slug }]
  const held = await getPage({ pageTypeSlug: PAGE_TYPE, where })
  if (held === null) return null
  const taps = tapsOn(held) + 1
  const moment = at.toISOString()
  await patchPage({
    pageTypeSlug: PAGE_TYPE,
    where,
    set: { [TAPS]: taps, [LAST_TAPPED_AT]: moment },
  })
  return { taps, at: moment }
}

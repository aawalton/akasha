import { getPage } from "@akasha/pages-access/get"
import { patchPage } from "@akasha/pages-access/patch"
import type { PageWhere } from "@akasha/pages-core/page-types"

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

/**
 * One more tap on the widget `slug` names, or nothing where no widget page carries that slug.
 *
 * THE STORE IS ASKED RATHER THAN THE CHECKOUT BESIDE THE CALLER. A pod's checkout is a clone, and a
 * clone carries no index, so nothing here could find the widget's own file. The store answers from
 * the machine holding the tree, and both values are uncommitted, so the write it makes there leaves
 * no commit.
 *
 * THE COUNT IS READ AND WRITTEN BACK RATHER THAN ADDED TO IN PLACE. Two taps arriving together read
 * the same count and write the same count back, so one of the two is lost. Alan reads this number to
 * tell a widget he uses from one he leaves alone, and that reading survives a tap going missing.
 */
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

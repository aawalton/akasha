/**
 * What a query works out by reducing one key over the pages it found.
 *
 * A REDUCTION ANSWERS A VALUE AND WHAT IT WAS TAKEN OVER, never a value alone. `pages/page-type/
 * page-query.page-type.md` states it: an answer carrying a value says how many pages that value was
 * taken over. A caller holding `42` cannot tell a sum of forty-two pages from a sum of one, and the
 * count is the only thing that tells it.
 *
 * A REDUCTION OVER NOTHING IS ABSENT RATHER THAN NOUGHT. This is the whole of what
 * `pages/domain/pages-system.domain.md`'s one rule asks for, in the one field where getting it wrong
 * is invisible: a sum of no pages answering `0` reads exactly like a sum of pages that hold nought,
 * and a mean of no pages has no value at all. `absent` is what a formula answers where there is
 * nothing to answer with, so it is what this answers too, and `over` standing at nought says why.
 *
 * A PAGE HOLDING NOTHING UNDER THE TARGET DOES NOT CONTRIBUTE AND IS NOT A FAULT. A key is absent on
 * every page whose page type does not declare it, which is the ordinary case across a family, so
 * refusing the whole reduction for one absent page would refuse most reductions over an expanded
 * set. What stops that being silent is `over`: a caller comparing it against how many pages were
 * found sees exactly how many held a number.
 *
 * PLURAL FIRST. Several targets are reduced in one pass over the pages, and the singular is the
 * plural asked for one, so the two cannot drift. Asking one target at a time walks every page again
 * for each, and the walk is the whole cost here.
 *
 * PURE. The pages arrive already read, as they do everywhere else under `pages-system/`. No disk, no
 * clock, nothing held between calls.
 */

import type { Value } from "../formula/formula.ts"
import type { Page } from "./query.ts"

/** The ways a set of numbers is reduced to one. What each means is the ordinary arithmetic. */
export type How = "sum" | "mean"

/** What one reduction answers. */
export type Reduced = {
  /** The number reduced out of the pages, or absent where no page held one. */
  readonly value: Value
  /** How many pages held a number under the target. */
  readonly over: number
}

/** What a reduction answers where no page held a number: no value, over none. */
const NOTHING: Reduced = { value: { kind: "absent" }, over: 0 }

/**
 * What each target reduces to over these pages, by the key it names.
 *
 * A VALUE THAT IS NOT A NUMBER DOES NOT CONTRIBUTE. A target is held to a key declared a number when
 * the query is checked, so a page answering anything else under it is a page read under another page
 * type's declaration rather than a query that should have been refused. Counting it would need a
 * meaning for adding a text to a number, which `pages/domain/language-failure.domain.md` refuses to
 * invent; leaving it out is reported by `over`, as an absent value is.
 *
 * EVERY TARGET ASKED FOR IS ANSWERED, over none where no page held a number under it. This is the
 * same way round as `pagesFor` and `holdingsFor`: a target that reduces to nothing stands in the
 * answer saying so, rather than being absent from it and read as a target never asked about.
 *
 * NOTHING ASKED FOR IS NOT WALKED FOR. A call naming no target answers nothing without touching a
 * page, the pass over the pages being the whole cost here.
 */
export const reducedFor = (
  pages: readonly Page[],
  targets: Iterable<string>,
  how: How
): Map<string, Reduced> => {
  const asked = new Set<string>()
  for (const one of targets) asked.add(one)
  const reduced = new Map<string, Reduced>()
  if (asked.size === 0) return reduced

  const running = new Map<string, { total: number; over: number }>()
  for (const one of asked) running.set(one, { total: 0, over: 0 })
  for (const page of pages) {
    for (const [key, mine] of running) {
      const held = page.values.properties[key]
      if (held === undefined || held.kind !== "number") continue
      mine.total += held.number
      mine.over += 1
    }
  }

  for (const [key, mine] of running) {
    if (mine.over === 0) {
      reduced.set(key, NOTHING)
      continue
    }
    const number = how === "sum" ? mine.total : mine.total / pages.length
    reduced.set(key, { value: { kind: "number", number }, over: mine.over })
  }
  return reduced
}

/**
 * What one target reduces to over these pages.
 *
 * ONE TARGET COSTS THE WHOLE PASS, this being `reducedFor` asked for one, so that what the singular
 * answers cannot drift from what the plural answers. A caller wanting several asks the plural once
 * rather than this once each.
 */
export const reducedOf = (pages: readonly Page[], target: string, how: How): Reduced =>
  reducedFor(pages, [target], how).get(target) ?? NOTHING

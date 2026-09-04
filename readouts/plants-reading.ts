// The whole plants Alan has eaten today are counted here, on the workstation that carries the
// checkout, and kept beside the readout they were counted for. It lives outside `akasha/` because
// an akasha file imports no file outside the akasha folder, and the window this counts over is
// reached only through `tools/lib/wake-day.ts`, the one file that says when Alan's day begins.
// What to ask and how to read the answer are said on the readout's own page; this file supplies
// the reach and nothing else.
//
// The reach differs from the safety and surplus tiles beside it. Those two read one row off the
// tracking day. Plants is not a field on a day at all: it is a sum over the `food-entry` pages,
// one file per thing eaten, and the day it counts to is worked out from the instant each entry
// happened at. So this asks the checkout directly rather than going through
// `tools/lib/tracking/day-place.ts`, which speaks for days and sessions and holds nothing about
// food.
//
// A food entry is an akasha page, so it is asked for with `asking`, which reads this checkout in
// this process and refuses both a page type the index does not hold and a key the page type does
// not declare. That refusal is the point of choosing it. What stood here handed the readout the
// markdown query client, which still recognises `food-entry` — its declaration survived the
// migration while the instance files it enumerates went — so it answered `ok` with no rows and no
// error rather than refusing the way it refuses a page type whose declaration went too. This tile
// read zero every five minutes while 87 food entries stood in akasha, and Alan saw a black tile
// that was measuring nothing.
//
// The window is the one the old saved query named as `wake-day`: from the hour Alan rose to the
// hour he rises next. `wakeDayOf` settles which day the current instant belongs to, since an
// instant before Alan rose still counts to the day before.
//
// Zero is a reading here, unlike on the surplus tile. A surplus of zero came out of subtracting
// two absent halves and read as a healthy rung, so it had to be refused. Plant grams of zero come
// out of counting nothing, and the lowest rung on the scale sits at forty, so a day that has begun
// with nothing eaten shows dark — which is true. That is also why the silent zero above hid for as
// long as it did: on a morning before Alan has eaten, the blind reading and the true reading are
// the same number.
//
// The count itself is never printed. It says what Alan has and has not eaten, and a service log is
// the wrong place for that.
import { AKASHA, resolveRoots } from "@akasha/pages-system/checkout-roots"
import { asking } from "@akasha/pages-system-service/asking"
import type { Asking } from "@akasha/readout-system/readout-asking"
import { keepReading } from "@akasha/readout-system/readout-reading"
import { fetchPlantGrams } from "@akasha/readout-system/upkeep-plants"
import {
  wakeDayOf,
  wakeDayWindow,
} from "../akasha/alan/tracking/daily/day-opening/day-opening.module.code.ts"

export const READOUT_PAGE =
  "akasha/readout-system/readouts/pages/upkeep-plants/upkeep-plants.readout.ts"

/** The checkout, asked as a readout asks: a refusal is an answer that is not ok rather than a throw. */
export function askingIn(root: string): Asking {
  return async (query) => {
    const asked = asking(root, query as never)
    if ("refused" in asked) return { ok: false, why: asked.refused }
    return { ok: true, rows: asked.rows.map((values) => ({ values })) }
  }
}

export async function takeReading(root: string, now: Date = new Date()): Promise<number> {
  const here = resolveRoots()
  const window = wakeDayWindow(here, wakeDayOf(here, now))
  const checkout = (here as unknown as Readonly<Record<string, string>>)[AKASHA] ?? root
  const grams = await fetchPlantGrams(askingIn(checkout), window.from, window.to)
  keepReading(root, READOUT_PAGE, grams, now)
  return grams
}

if (import.meta.main) {
  const root = process.env.AKASHA_ROOT ?? process.cwd()
  try {
    await takeReading(root)
    process.stdout.write(`plant grams were counted and kept beside ${READOUT_PAGE}\n`)
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}

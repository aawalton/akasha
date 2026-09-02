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
// happened at. So this asks the checkout engine directly rather than going through
// `tools/lib/tracking/day-place.ts`, which speaks for days and sessions and holds nothing about
// food.
//
// The window is the one the old saved query named as `wake-day`: from the hour Alan rose to the
// hour he rises next. `wakeDayOf` settles which day the current instant belongs to, since an
// instant before Alan rose still counts to the day before.
//
// Zero is a reading here, unlike on the surplus tile. A surplus of zero came out of subtracting
// two absent halves and read as a healthy rung, so it had to be refused. Plant grams of zero come
// out of counting nothing, and the lowest rung on the scale sits at forty, so a day that has begun
// with nothing eaten shows dark — which is true.
//
// The count itself is never printed. It says what Alan has and has not eaten, and a service log is
// the wrong place for that.
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { keepReading } from "@akasha/readout-system/readout-reading"
import { fetchPlantGrams } from "@akasha/readout-system/upkeep-plants"
import { askComposed } from "../tools/lib/page-query-client.ts"
import { wakeDayOf, wakeDayWindow } from "../tools/lib/wake-day.ts"

export const READOUT_PAGE =
  "akasha/readout-system/readout/readouts/upkeep-plants/upkeep-plants.readout.ts"

export async function takeReading(root: string, now: Date = new Date()): Promise<number> {
  const here = resolveRoots()
  const window = wakeDayWindow(here, wakeDayOf(here, now))
  const grams = await fetchPlantGrams(askComposed, window.from, window.to)
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

// The safety level Alan logs is read here, on the workstation that carries the checkout, and kept
// beside the readout the level was taken for. It lives outside `akasha/` because an akasha file
// imports no file outside the akasha folder, and the level rides on a session row, which is reached
// only through `tools/lib/tracking/day-place.ts`, the one file that says where a day is kept. What
// to ask and how to read the answer are said on the readout's own page; this file supplies the
// reach and nothing else.
//
// The row comes from `openSession` rather than from a query written here, so a session beside a day
// that moved into akasha is read where it moved to. This file used to hand `askComposed` to
// `fetchSafetyLevel`, which composed its own `session-tracking` query out of sight of the funnel.
// The two queries are the same query, so nothing is wrong today; what was wrong is that a reader of
// Alan's sessions sat outside the one file the migration turns.
//
// It matters more here than the same fault did on the surplus tile. `session-tracking` holds no
// files of its own — its rows are read out of the sidecars beside the day pages, and
// `daily-tracking` names both the markdown half and the akasha half in one `files:` list. So a
// query for an end-time that is empty reaches both halves at once, and a session opened before its
// day moved and closed after it moved is answered twice: an older row still saying open, and the
// moved row saying closed. Newest-first over `start-time` does not choose between those two.
// `openSession` is where that choice belongs, and it is the only reader this file now has.
//
// `levelIn` reads the row, and it is akasha's own guard, unchanged: no open session, an open
// session carrying no level, and a level spelling no number are each no reading rather than a level
// of zero. `openSession` hands the row back with its keys camelized while `levelIn` is written
// against the spelling the store keeps, so the one key it reads is spelled back for it here; the
// guard itself is not rewritten.
//
// The level itself is never printed. It says where Alan is, and a service log is the wrong place
// for that.
import { keepReading } from "@akasha/readout-system/readout-reading"
import { levelIn } from "@akasha/readout-system/upkeep-safety"
import { openSession } from "../tools/lib/tracking/day-place.ts"

export const READOUT_PAGE =
  "akasha/readout-system/readout/readouts/upkeep-safety/upkeep-safety.readout.ts"

export const NOTHING_TO_TAKE =
  "no open block carries a safety level, so there is no reading to take. A tile showing no signal " +
  "is right where a tile showing a level Alan is not at would be a lie."

export async function takeReading(root: string, now: Date = new Date()): Promise<number | null> {
  const session = await openSession()
  if (session === null) return null
  const level = levelIn({ "safety-level": session["safetyLevel"] })
  if (level === null) return null
  keepReading(root, READOUT_PAGE, level, now)
  return level
}

if (import.meta.main) {
  const root = process.env.AKASHA_ROOT ?? process.cwd()
  try {
    const level = await takeReading(root)
    if (level === null) {
      process.stderr.write(`${NOTHING_TO_TAKE}\n`)
      process.exit(2)
    }
    process.stdout.write(`a safety level was taken and kept beside ${READOUT_PAGE}\n`)
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}

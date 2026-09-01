// The safety level Alan logs is read here, on the workstation that carries the checkout, and kept
// beside the readout the level was taken for. It stands outside `akasha/` because an akasha file
// imports no file outside the akasha folder, and the level lives in tracking rows that only
// `tools/lib/page-query-client.ts` reaches. What to ask and how to read the answer are stated on
// the readout's own page; this file supplies the reach and nothing else.
//
// The level itself is never printed. It says where Alan is, and a service log is the wrong place
// for that.
import { keepReading } from "@akasha/readout-system/readout-reading"
import { fetchSafetyLevel } from "@akasha/readout-system/upkeep-safety"
import { askComposed } from "../tools/lib/page-query-client.ts"

export const READOUT_PAGE =
  "akasha/readout-system/readout/readouts/upkeep-safety/upkeep-safety.readout.ts"

export const NOTHING_TO_TAKE =
  "no open block carries a safety level, so there is no reading to take. A tile showing no signal " +
  "is right where a tile showing a level Alan is not at would be a lie."

export async function takeReading(root: string, now: Date = new Date()): Promise<number | null> {
  const level = await fetchSafetyLevel(askComposed)
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

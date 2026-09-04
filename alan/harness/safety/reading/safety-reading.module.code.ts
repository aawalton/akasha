import { keepReading } from "@akasha/readout-system/readout-reading"
import { levelIn } from "@akasha/readout-system/upkeep-safety"
import { openSession } from "../../../tracking/daily/day-place/day-place.module.code.ts"

export const READOUT_PAGE =
  "readout-system/readouts/pages/upkeep-safety/upkeep-safety.readout.ts"

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

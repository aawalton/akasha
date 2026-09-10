import { multiplierIn } from "akasha/readouts/pages/cost-multiplier/cost-multiplier.readout.code.ts"
import { keepReading } from "akasha/readouts/reading/readout-reading.module.code.ts"
import { openSession } from "../../../track/daily/day-stretches/day-stretches.module.code.ts"

export const READOUT_PAGE = "readouts/pages/cost-multiplier/cost-multiplier.readout.ts"

export const NOTHING_TO_TAKE =
  "no open block carries both a safety level and a difficulty level, so there is no cost to " +
  "take. A tile showing no signal is right where a tile showing a cost Alan is not paying " +
  "would be a lie."

export async function takeReading(root: string, now: Date = new Date()): Promise<number | null> {
  const session = await openSession()
  if (session === null) return null
  const multiplier = multiplierIn({
    safetyLevel: session["safetyLevel"],
    difficultyLevel: session["difficultyLevel"],
  })
  if (multiplier === null) return null
  keepReading(root, READOUT_PAGE, multiplier, now)
  return multiplier
}

if (import.meta.main) {
  const root = process.env.AKASHA_ROOT ?? process.cwd()
  try {
    const multiplier = await takeReading(root)
    if (multiplier === null) {
      process.stderr.write(`${NOTHING_TO_TAKE}\n`)
      process.exit(2)
    }
    process.stdout.write(`a cost was taken and kept beside ${READOUT_PAGE}\n`)
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}

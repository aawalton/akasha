import { multiplierIn } from "akasha/alan/harness/cost/readouts/multiplier/cost-multiplier.readout.reading.code.ts"
import {
  keepReading,
  readoutPage,
} from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import { openSession } from "akasha/alan/track/daily/modules/day-stretches/day-stretches.module.code.ts"
import { rootStated } from "akasha/command/modules/rooting/rooting.module.code.ts"

export const READOUT_SLUG = "cost-multiplier"

const NOTHING_TO_TAKE =
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
  keepReading(root, readoutPage(root, READOUT_SLUG), multiplier, now)
  return multiplier
}

if (import.meta.main) {
  const root = rootStated(process.env) ?? process.cwd()
  try {
    const multiplier = await takeReading(root)
    if (multiplier === null) {
      process.stderr.write(`${NOTHING_TO_TAKE}\n`)
      process.exit(2)
    }
    process.stdout.write(`a cost was taken and kept beside ${readoutPage(root, READOUT_SLUG)}\n`)
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}

import { multiplierIn } from "akasha/alan/harness/readouts/pages/cost-multiplier/cost-multiplier.readout.code.ts"
import {
  keepReading,
  readoutPage,
} from "akasha/alan/harness/readouts/reading/readout-reading.module.code.ts"
import { openSession } from "akasha/alan/track/daily/day-stretches/day-stretches.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

export const READOUT_SLUG = "cost-multiplier"

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
  keepReading(root, readoutPage(root, READOUT_SLUG), multiplier, now)
  return multiplier
}

if (import.meta.main) {
  const root = optionalEnv("AKASHA_ROOT") ?? process.cwd()
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

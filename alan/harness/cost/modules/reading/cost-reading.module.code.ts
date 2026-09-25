import { costReading } from "akasha/alan/harness/cost/modules/reading/cost-reading.module.ts"
import { multiplierIn } from "akasha/alan/harness/cost/readouts/multiplier/cost-multiplier.readout.reading.code.ts"
import {
  keepReading,
  readoutServedBy,
} from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import { openSession } from "akasha/alan/track/daily/modules/day-stretches/day-stretches.module.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { rootStated } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

const SERVED_BY = namedAs(module.slug, costReading.slug, null)

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
  keepReading(root, readoutServedBy(root, SERVED_BY), multiplier, now)
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
    process.stdout.write(`a cost was taken and kept beside ${readoutServedBy(root, SERVED_BY)}\n`)
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}

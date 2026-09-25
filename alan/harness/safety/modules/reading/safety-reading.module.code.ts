import {
  keepReading,
  readoutServedBy,
} from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import { safetyReading } from "akasha/alan/harness/safety/modules/reading/safety-reading.module.ts"
import { levelIn } from "akasha/alan/harness/safety/readouts/upkeep-safety/upkeep-safety.readout.reading.code.ts"
import { openSession } from "akasha/alan/track/daily/modules/day-stretches/day-stretches.module.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { rootStated } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

const SERVED_BY = namedAs(module.slug, safetyReading.slug, null)

const NOTHING_TO_TAKE =
  "no open block carries a safety level, so there is no reading to take. A tile showing no signal " +
  "is right where a tile showing a level Alan is not at would be a lie."

export async function takeReading(root: string, now: Date = new Date()): Promise<number | null> {
  const session = await openSession()
  if (session === null) return null
  const level = levelIn({ "safety-level": session["safetyLevel"] })
  if (level === null) return null
  keepReading(root, readoutServedBy(root, SERVED_BY), level, now)
  return level
}

if (import.meta.main) {
  const root = rootStated(process.env) ?? process.cwd()
  try {
    const level = await takeReading(root)
    if (level === null) {
      process.stderr.write(`${NOTHING_TO_TAKE}\n`)
      process.exit(2)
    }
    process.stdout.write(
      `a safety level was taken and kept beside ${readoutServedBy(root, SERVED_BY)}\n`
    )
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}

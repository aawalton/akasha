// The surplus Alan's day has left of his night is read here, on the workstation that carries the
// checkout, and kept beside the readout the surplus was taken for. It lives outside `akasha/`
// because an akasha file imports no file outside the akasha folder, and the day's row is reached
// only by `tools/lib/page-query-client.ts`. What to ask and how to read the answer are said on the
// readout's own page; this file supplies the reach and nothing else.
//
// The surplus itself is never printed. It says how much of Alan's night his day has eaten, and a
// service log is the wrong place for that.
import { getEsoDayStr } from "@akasha/day/eso-day"
import { keepReading } from "@akasha/readout-system/readout-reading"
import { fetchSurplusHours } from "@akasha/readout-system/upkeep-surplus"
import { askComposed } from "../tools/lib/page-query-client.ts"

export const READOUT_PAGE =
  "akasha/readout-system/readout/readouts/upkeep-surplus/upkeep-surplus.readout.ts"

export const NOTHING_TO_TAKE =
  "no tracking day carries a surplus, so there is no reading to take. A tile showing no signal is " +
  "right where a tile showing hours Alan does not have would be a lie."

export async function takeReading(root: string, now: Date = new Date()): Promise<number | null> {
  const hours = await fetchSurplusHours(askComposed, getEsoDayStr(now))
  if (hours === null) return null
  keepReading(root, READOUT_PAGE, hours, now)
  return hours
}

if (import.meta.main) {
  const root = process.env.AKASHA_ROOT ?? process.cwd()
  try {
    const hours = await takeReading(root)
    if (hours === null) {
      process.stderr.write(`${NOTHING_TO_TAKE}\n`)
      process.exit(2)
    }
    process.stdout.write(`a surplus was taken and kept beside ${READOUT_PAGE}\n`)
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}

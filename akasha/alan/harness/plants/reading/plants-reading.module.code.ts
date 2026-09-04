import { AKASHA, resolveRoots } from "@akasha/pages-system/checkout-roots"
import { asking } from "@akasha/pages-system-service/asking"
import type { Asking } from "@akasha/readout-system/readout-asking"
import { keepReading } from "@akasha/readout-system/readout-reading"
import { fetchPlantGrams } from "@akasha/readout-system/upkeep-plants"
import { wakeDayOf, wakeDayWindow } from "@tools/lib/wake-day"

export const READOUT_PAGE =
  "akasha/readout-system/readouts/pages/upkeep-plants/upkeep-plants.readout.ts"

export function askingIn(root: string): Asking {
  return async (query) => {
    const asked = asking(root, query as never)
    if ("refused" in asked) return { ok: false, why: asked.refused }
    return { ok: true, rows: asked.rows.map((values) => ({ values })) }
  }
}

export async function takeReading(root: string, now: Date = new Date()): Promise<number> {
  const here = resolveRoots()
  const window = wakeDayWindow(here, wakeDayOf(here, now))
  const checkout = here[AKASHA] ?? root
  const grams = await fetchPlantGrams(askingIn(checkout), window.from, window.to)
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

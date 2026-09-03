import { ensureAllOutputDirs } from "../addon-data-output-dirs/addon-data-output-dirs.module.code.ts"
import { fetchAddonDataPages } from "../addon-data-pages/addon-data-pages.module.code.ts"
import { buildAddonDataWrites } from "../addon-data-writes/addon-data-writes.module.code.ts"
import { logInventoryOutputSummary } from "../inventory-output-summary/inventory-output-summary.module.code.ts"
import { buildMappingGeneratorWrites } from "../mapping-generator-writes/mapping-generator-writes.module.code.ts"
import { buildMappingTotals } from "../mapping-totals/mapping-totals.module.code.ts"
import {
  buildPageRowTotals,
  logMappingTotals,
  logPageRowTotals,
} from "../page-row-totals/page-row-totals.module.code.ts"
import { validateEquipmentMappings } from "../validate-equipment-mappings/validate-equipment-mappings.module.code.ts"

/**
 * The emitted data no longer matching the hand-written equipment mappings.
 *
 * Both callers tell this apart from every other throw to answer a data error rather than a
 * failure, so it is a class of its own rather than an `Error` carrying a recognisable message.
 */
export class EquipmentMappingsStale extends Error {}

export type Say = (line: string) => void

/**
 * Writes every addon data file from the pages holding their source, then answers for the
 * equipment mappings.
 *
 * The validation runs after the writes rather than before, because what it asks is whether the
 * committed tables still agree with the data this run just emitted.
 */
export async function generateAddonData(say: Say = console.log): Promise<void> {
  say("Generating addon data files...\n")
  const pages = await fetchAddonDataPages()
  ensureAllOutputDirs()
  const writes: Promise<number>[] = [
    ...buildAddonDataWrites(pages),
    ...buildMappingGeneratorWrites(),
  ]
  await Promise.all(writes)
  logMappingTotals(buildMappingTotals())
  logPageRowTotals(buildPageRowTotals(pages))
  logInventoryOutputSummary()
  say("Validating the committed equipment mappings...")
  if (!validateEquipmentMappings()) {
    throw new EquipmentMappingsStale(
      "equipment mappings do not match the temper data these generators just emitted"
    )
  }
  say("  All equipment mappings match temper data.\n\nDone.")
}

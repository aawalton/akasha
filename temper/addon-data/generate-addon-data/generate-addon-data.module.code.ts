import { ensureAllOutputDirs } from "akasha/temper/addon-data/addon-data-output-dirs/addon-data-output-dirs.module.code.ts"
import { fetchAddonDataPages } from "akasha/temper/addon-data/addon-data-pages/addon-data-pages.module.code.ts"
import { buildAddonDataWrites } from "akasha/temper/addon-data/addon-data-writes/addon-data-writes.module.code.ts"
import { logInventoryOutputSummary } from "akasha/temper/addon-data/inventory-output-summary/inventory-output-summary.module.code.ts"
import { buildMappingGeneratorWrites } from "akasha/temper/addon-data/mapping-generator-writes/mapping-generator-writes.module.code.ts"
import { buildMappingTotals } from "akasha/temper/addon-data/mapping-totals/mapping-totals.module.code.ts"
import {
  buildPageRowTotals,
  logMappingTotals,
  logPageRowTotals,
} from "akasha/temper/addon-data/page-row-totals/page-row-totals.module.code.ts"
import { validateEquipmentMappings } from "akasha/temper/addon-data/validate-equipment-mappings/validate-equipment-mappings.module.code.ts"

export class EquipmentMappingsStale extends Error {}

export type Say = (line: string) => void

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

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

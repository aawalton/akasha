import { WEB_ENGINE_INVENTORY_DIR } from "akasha/temper/addon-data/modules/addon-data-output-dirs/addon-data-output-dirs.module.code.ts"
import type { AddonDataPages } from "akasha/temper/addon-data/modules/addon-data-pages/addon-data-pages.module.code.ts"
import { generatePotionRestoreMetrics } from "akasha/temper/addon-data/potion-restore-metrics/potion-restore-metrics.module.code.ts"

export function buildAddonDataWritesAlchemy(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      WEB_ENGINE_INVENTORY_DIR,
      "potion-restore-metrics.generated.ts",
      generatePotionRestoreMetrics(p.minedRestorePotions)
    ),
  ]
}

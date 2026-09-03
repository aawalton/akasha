import { WEB_ENGINE_INVENTORY_DIR } from "../addon-data-output-dirs/addon-data-output-dirs.module.code.ts"
import type { AddonDataPages } from "../addon-data-pages/addon-data-pages.module.code.ts"
import { generateScribingTotalScriptCount } from "../render-scribing-total-script-count/render-scribing-total-script-count.module.code.ts"

export function buildAddonDataWritesScribing(
  _p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      WEB_ENGINE_INVENTORY_DIR,
      "scribing-total-script-count.generated.ts",
      generateScribingTotalScriptCount()
    ),
  ]
}

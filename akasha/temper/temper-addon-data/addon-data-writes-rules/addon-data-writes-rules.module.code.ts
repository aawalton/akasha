import { generateTemperComparisonOp } from "@akasha/temper-addon-generators/temper-comparison-op"
import { generateTemperRuleTemplate } from "@akasha/temper-addon-generators/temper-rule-template"
import { WEB_ENGINE_INVENTORY_DIR } from "../addon-data-output-dirs/addon-data-output-dirs.module.code.ts"
import type { AddonDataPages } from "../addon-data-pages/addon-data-pages.module.code.ts"

export function buildAddonDataWritesRules(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      WEB_ENGINE_INVENTORY_DIR,
      "temper-comparison-op.generated.ts",
      generateTemperComparisonOp(p.comparisonOpPages.rows)
    ),
    w(
      WEB_ENGINE_INVENTORY_DIR,
      "temper-rule-template.generated.ts",
      generateTemperRuleTemplate(p.ruleTemplatePages.rows)
    ),
  ]
}

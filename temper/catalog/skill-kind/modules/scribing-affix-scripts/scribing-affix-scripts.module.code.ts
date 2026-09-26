import type { AffixScriptId as AffixScriptPageSlug } from "akasha/temper/catalog/skill/temper-script/modules/script-ids/script-ids.data-table.code.ts"
import {
  skillCatalog,
  tableView,
} from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"

export const affixScripts = tableView(() => skillCatalog().affixScripts)

export type AffixScriptId = AffixScriptPageSlug

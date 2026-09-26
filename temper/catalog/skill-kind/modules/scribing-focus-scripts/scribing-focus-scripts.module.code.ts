import type { FocusScriptId as FocusScriptPageSlug } from "akasha/temper/catalog/skill/temper-script/modules/script-ids/script-ids.data-table.code.ts"
import {
  skillCatalog,
  tableView,
} from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"

export const focusScripts = tableView(() => skillCatalog().focusScripts)

export type FocusScriptId = FocusScriptPageSlug

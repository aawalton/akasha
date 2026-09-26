import type { SignatureScriptId as SignatureScriptPageSlug } from "akasha/temper/catalog/skill/temper-script/modules/script-ids/script-ids.data-table.code.ts"
import {
  skillCatalog,
  tableView,
} from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"

export const signatureScripts = tableView(() => skillCatalog().signatureScripts)

export type SignatureScriptId = SignatureScriptPageSlug

import { DO_NOT_EDIT } from "akasha/temper/addon-generators/do-not-edit/do-not-edit.module.code.ts"
import { affixScripts } from "akasha/temper/skill-kinds/scribing-affix-scripts/scribing-affix-scripts.module.code.ts"
import { focusScripts } from "akasha/temper/skill-kinds/scribing-focus-scripts/scribing-focus-scripts.module.code.ts"
import { signatureScripts } from "akasha/temper/skill-kinds/scribing-signature-scripts/scribing-signature-scripts.module.code.ts"

export function generateScribingTotalScriptCount(): string {
  const total = focusScripts.ids.length + signatureScripts.ids.length + affixScripts.ids.length
  return `\
/**
 * Scribing Total Script Count (Generated)
 *
 * The universe of unique scribing scripts (focus + signature + affix).
 * Source: @temper/game-characters-skills/scribing/{focus,signature,affix}-scripts-data
 *
 * ${DO_NOT_EDIT}
 */

export const TOTAL_SCRIPT_COUNT = ${total}
`
}

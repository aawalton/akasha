import { affixScripts } from "../../skill-kinds/scribing-affix-scripts/scribing-affix-scripts.module.code.ts"
import { focusScripts } from "../../skill-kinds/scribing-focus-scripts/scribing-focus-scripts.module.code.ts"
import { signatureScripts } from "../../skill-kinds/scribing-signature-scripts/scribing-signature-scripts.module.code.ts"

export function generateScribingTotalScriptCount(): string {
  const total = focusScripts.ids.length + signatureScripts.ids.length + affixScripts.ids.length
  return `\
/**
 * Scribing Total Script Count (Generated)
 *
 * The universe of unique scribing scripts (focus + signature + affix).
 * Source: @temper/game-characters-skills/scribing/{focus,signature,affix}-scripts-data
 *
 * DO NOT EDIT — regenerate with: akasha temper-addon-data-generate
 */

export const TOTAL_SCRIPT_COUNT = ${total}
`
}

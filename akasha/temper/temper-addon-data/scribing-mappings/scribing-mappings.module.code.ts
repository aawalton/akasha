import { grimoires } from "@akasha/temper-character-skills/scribing-grimoires"
import { affixScripts } from "@akasha/temper-skill-kinds/scribing-affix-scripts"
import { focusScripts } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import { signatureScripts } from "@akasha/temper-skill-kinds/scribing-signature-scripts"
import { requireFirst } from "@akasha/utils-narrow/require-first"

interface ScribingMappingTable {
  tableName: string
  helperName: string
  temperIdHelperName: string
  defaultId: string
  entries: readonly { itemId: number; index: number; temperId: string; name: string }[]
}

function buildScribingTable(
  tableName: string,
  helperName: string,
  temperIdHelperName: string,
  defaultId: string,
  dataFile: {
    ids: readonly string[]
    data: Record<string, { id: string; name: string; itemId: number }>
  }
): ScribingMappingTable {
  const entries: { itemId: number; index: number; temperId: string; name: string }[] = []
  for (const [i, id] of dataFile.ids.entries()) {
    const item = dataFile.data[id]
    if (item === undefined) continue
    entries.push({ itemId: item.itemId, index: i, temperId: item.id, name: item.name })
  }
  return { tableName, helperName, temperIdHelperName, defaultId, entries }
}

export function generateScribingMappings(): string {
  const tables: ScribingMappingTable[] = [
    buildScribingTable(
      "GRIMOIRE_NAME",
      "getGrimoireIndex",
      "getGrimoireTemperId",
      requireFirst(grimoires.ids, "grimoires.ids"),
      grimoires
    ),
    buildScribingTable(
      "FOCUS_SCRIPT_NAME",
      "getFocusScriptIndex",
      "getFocusScriptTemperId",
      requireFirst(focusScripts.ids, "focusScripts.ids"),
      focusScripts
    ),
    buildScribingTable(
      "SIGNATURE_SCRIPT_NAME",
      "getSignatureScriptIndex",
      "getSignatureScriptTemperId",
      requireFirst(signatureScripts.ids, "signatureScripts.ids"),
      signatureScripts
    ),
    buildScribingTable(
      "AFFIX_SCRIPT_NAME",
      "getAffixScriptIndex",
      "getAffixScriptTemperId",
      requireFirst(affixScripts.ids, "affixScripts.ids"),
      affixScripts
    ),
  ]

  const sections: string[] = []
  for (const table of tables) {
    const indexEntries: string[] = []
    const temperIdEntries: string[] = []
    for (const entry of table.entries) {
      if (entry.itemId === 0) continue
      indexEntries.push(`  ["${entry.name}"]: ${entry.index},`)
      temperIdEntries.push(`  ["${entry.name}"]: "${entry.temperId}",`)
    }

    sections.push(`export const ${table.tableName}_TO_INDEX: Record<string, number> = {
${indexEntries.join("\n")}
}

export const ${table.tableName}_TO_TEMPER_ID: Record<string, string> = {
${temperIdEntries.join("\n")}
}

export function ${table.helperName}(name: string): number {
  return ${table.tableName}_TO_INDEX[name] ?? 0
}

export function ${table.temperIdHelperName}(name: string): string {
  return ${table.tableName}_TO_TEMPER_ID[name] ?? "${table.defaultId}"
}`)
  }

  return `\
/**
 * Scribing Mappings (Generated)
 *
 * Maps ESO display names to temper indices and string IDs for scribing components.
 * Source: engine/skills/scribing/ data files
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

${sections.join("\n\n")}
`
}

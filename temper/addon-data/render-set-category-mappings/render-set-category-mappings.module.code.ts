import { setsAll } from "akasha/temper/temper-characters-equipment/sets-all/sets-all.module.code.ts"

export function generateSetCategoryMappings(): string {
  const entries: string[] = []
  for (const id of setsAll.ids) {
    const set = setsAll.data[id]
    if (set === undefined) continue
    if (set.esoSetId === 0) continue
    entries.push(`  [${set.esoSetId}]: "${set.subcategoryId}", // ${set.name}`)
  }

  return `\
/**
 * Set Category Mappings (Generated)
 *
 * Maps ESO set IDs to set source category IDs.
 * Source: engine/equipment/sets/sets-all-data.ts
 *
 * DO NOT EDIT — regenerate with: akasha temper-addon-data-generate
 */

export const SET_ESO_ID_TO_CATEGORY: Record<number, string> = {
${entries.join("\n")}
}
`
}

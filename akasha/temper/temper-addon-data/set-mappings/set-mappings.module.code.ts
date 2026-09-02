import { setsAll } from "@akasha/temper-characters-equipment/sets-all"
export function generateSetMappings(): string {
  const indexEntries: string[] = []
  const temperIdEntries: string[] = []
  for (const [i, id] of setsAll.ids.entries()) {
    const set = setsAll.data[id]
    if (set === undefined) continue
    if (set.esoSetId === 0) continue
    indexEntries.push(`  [${set.esoSetId}]: ${i}, // ${set.name}`)
    temperIdEntries.push(`  [${set.esoSetId}]: "${set.id}", // ${set.name}`)
  }

  return `\
/**
 * Set Mappings (Generated)
 *
 * Maps ESO set IDs to temper indices and string IDs.
 * Source: engine/equipment/sets/sets-all-data.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const SET_ESO_ID_TO_INDEX: Record<number, number> = {
${indexEntries.join("\n")}
}

export const SET_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
${temperIdEntries.join("\n")}
}

export function getSetIndex(esoSetId: number): number {
  return SET_ESO_ID_TO_INDEX[esoSetId] ?? 0
}

export function getSetTemperId(esoSetId: number): string {
  return SET_ESO_ID_TO_TEMPER_ID[esoSetId] ?? "no-set"
}
`
}

import { alliances } from "@akasha/temper-character-sources/alliances"

export function generateAllianceMappings(): string {
  const indexEntries: string[] = []
  const temperIdEntries: string[] = []
  for (const [i, id] of alliances.ids.entries()) {
    const alliance = alliances.data[id]
    if (alliance === undefined) continue
    if (alliance.esoAllianceId === 0) continue
    indexEntries.push(`  [${alliance.esoAllianceId}]: ${i}, // ${alliance.name}`)
    temperIdEntries.push(`  [${alliance.esoAllianceId}]: "${alliance.id}", // ${alliance.name}`)
  }

  return `\
/**
 * Alliance Mappings (Generated)
 *
 * Maps ESO alliance IDs to temper indices and string IDs.
 * Source: engine/character/alliances-data.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const ALLIANCE_ESO_ID_TO_INDEX: Record<number, number> = {
${indexEntries.join("\n")}
}

export const ALLIANCE_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
${temperIdEntries.join("\n")}
}

export function getAllianceIndex(esoAllianceId: number): number {
  return ALLIANCE_ESO_ID_TO_INDEX[esoAllianceId] ?? 0
}

export function getAllianceTemperId(esoAllianceId: number): string {
  return ALLIANCE_ESO_ID_TO_TEMPER_ID[esoAllianceId] ?? "no-alliance"
}
`
}

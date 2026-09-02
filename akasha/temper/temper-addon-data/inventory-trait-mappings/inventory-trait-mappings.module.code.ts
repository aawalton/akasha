import { armorTraits } from "@akasha/temper-equipment/armor-traits"
import { jewelryTraits } from "@akasha/temper-equipment/jewelry-traits"
import { weaponTraits } from "@akasha/temper-equipment/weapon-traits"

function buildTraitSection(
  tableName: string,
  dataFile: {
    ids: readonly string[]
    data: Record<string, { id: string; name: string; esoTraitConstantName: string }>
  }
): string {
  const entries: string[] = []
  for (const id of dataFile.ids) {
    const item = dataFile.data[id]
    if (item === undefined) continue
    entries.push(`  [${item.esoTraitConstantName}]: "${item.id}", // ${item.name}`)
  }
  return `export const ${tableName}_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
${entries.join("\n")}
}`
}

export function generateInventoryTraitMappings(): string {
  const sections = [
    buildTraitSection("PLAYER_ARMOR_TRAIT", armorTraits),
    buildTraitSection("PLAYER_WEAPON_TRAIT", weaponTraits),
    buildTraitSection("PLAYER_JEWELRY_TRAIT", jewelryTraits),
  ]

  return `\
/**
 * Trait Mappings for Inventory Rules (Generated)
 *
 * Maps ESO trait type constants to temper string IDs.
 * Used by checkTraitOverride() to match items against trait-conditioned rules.
 * Source: engine/equipment/ trait data files
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

${sections.join("\n\n")}
`
}

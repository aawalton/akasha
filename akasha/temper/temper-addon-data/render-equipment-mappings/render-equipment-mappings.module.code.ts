import { armorEnchants } from "@akasha/temper-characters-equipment/armor-enchants"
import { jewelryEnchants } from "@akasha/temper-characters-equipment/jewelry-enchants"
import { weaponEnchantments } from "@akasha/temper-characters-equipment/weapon-enchants"
import { weaponTypes } from "@akasha/temper-characters-equipment/weapon-types-data"
import { armorTraits } from "@akasha/temper-equipment/armor-traits"
import { jewelryTraits } from "@akasha/temper-equipment/jewelry-traits"
import { weaponTraits } from "@akasha/temper-equipment/weapon-traits"

interface EquipmentMappingTable {
  tableName: string
  helperName: string
  temperIdHelperName: string
  defaultId: string
  entries: readonly { esoId: string; index: number; temperId: string; name: string }[]
}

function buildEquipmentTable<F extends string>(
  tableName: string,
  helperName: string,
  temperIdHelperName: string,
  defaultId: string,
  dataFile: {
    ids: readonly string[]
    data: Record<string, { id: string; name: string } & Record<F, string>>
  },
  esoIdField: F
): EquipmentMappingTable {
  const entries: { esoId: string; index: number; temperId: string; name: string }[] = []
  for (const [i, id] of dataFile.ids.entries()) {
    const item = dataFile.data[id]
    if (item === undefined) continue
    const esoId = item[esoIdField]
    entries.push({ esoId, index: i, temperId: item.id, name: item.name })
  }
  return { tableName, helperName, temperIdHelperName, defaultId, entries }
}

export function generatePlayerEquipmentMappings(): string {
  const tables: EquipmentMappingTable[] = [
    buildEquipmentTable(
      "PLAYER_ARMOR_TRAIT",
      "getPlayerArmorTraitIndex",
      "getPlayerArmorTraitTemperId",
      "no-trait",
      armorTraits,
      "esoTraitConstantName"
    ),
    buildEquipmentTable(
      "PLAYER_WEAPON_TRAIT",
      "getPlayerWeaponTraitIndex",
      "getPlayerWeaponTraitTemperId",
      "no-trait",
      weaponTraits,
      "esoTraitConstantName"
    ),
    buildEquipmentTable(
      "PLAYER_JEWELRY_TRAIT",
      "getPlayerJewelryTraitIndex",
      "getPlayerJewelryTraitTemperId",
      "no-trait",
      jewelryTraits,
      "esoTraitConstantName"
    ),
    buildEquipmentTable(
      "PLAYER_ARMOR_ENCHANT",
      "getPlayerArmorEnchantIndex",
      "getPlayerArmorEnchantTemperId",
      "no-enchant",
      armorEnchants,
      "esoEnchantConstantName"
    ),
    buildEquipmentTable(
      "PLAYER_WEAPON_ENCHANT",
      "getPlayerWeaponEnchantIndex",
      "getPlayerWeaponEnchantTemperId",
      "no-enchant",
      weaponEnchantments,
      "esoEnchantConstantName"
    ),
    buildEquipmentTable(
      "PLAYER_JEWELRY_ENCHANT",
      "getPlayerJewelryEnchantIndex",
      "getPlayerJewelryEnchantTemperId",
      "no-enchant",
      jewelryEnchants,
      "esoEnchantConstantName"
    ),
    buildEquipmentTable(
      "PLAYER_WEAPON_TYPE",
      "getPlayerWeaponTypeIndex",
      "getPlayerWeaponTypeTemperId",
      "no-type",
      weaponTypes,
      "esoWeaponType"
    ),
  ]

  const sections: string[] = []
  for (const table of tables) {
    const indexEntries: string[] = []
    const temperIdEntries: string[] = []
    for (const entry of table.entries) {
      indexEntries.push(`  [${entry.esoId}]: ${entry.index}, // ${entry.name}`)
      temperIdEntries.push(`  [${entry.esoId}]: "${entry.temperId}", // ${entry.name}`)
    }

    sections.push(`export const ${table.tableName}_ESO_ID_TO_INDEX: Record<number, number> = {
${indexEntries.join("\n")}
}

export const ${table.tableName}_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
${temperIdEntries.join("\n")}
}

export function ${table.helperName}(esoId: number): number {
  return ${table.tableName}_ESO_ID_TO_INDEX[esoId] ?? 0
}

export function ${table.temperIdHelperName}(esoId: number): string {
  return ${table.tableName}_ESO_ID_TO_TEMPER_ID[esoId] ?? "${table.defaultId}"
}`)
  }

  return `\
/**
 * Player Equipment Mappings (Generated)
 *
 * Maps ESO trait types, enchant categories, and weapon types to temper indices and string IDs.
 * Keys are ESO Lua global constants that resolve to numbers at runtime.
 * Source: engine/equipment/ data files
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

${sections.join("\n\n")}
`
}

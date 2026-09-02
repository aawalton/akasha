import type {
  CategoryRule,
  ItemAction,
} from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryEquipmentConfig } from "../inventory-settings-types/inventory-settings-types.module.code.ts"
import { INVENTORY_CONFIG_DEFAULTS } from "../inventory-settings-types/inventory-settings-types.module.code.ts"

const EQUIPMENT_NODE_IDS = new Set(["equipment", "weapons", "armor", "jewelry"])

export function buildEquipmentConfig(
  activeRules: readonly CategoryRule[],
  action: (nodeId: string) => ItemAction | false
): InventoryEquipmentConfig {
  const d = INVENTORY_CONFIG_DEFAULTS

  const equipMaxLevel =
    activeRules.find((r) => EQUIPMENT_NODE_IDS.has(r.categoryId) && r.conditions?.maxLevel != null)
      ?.conditions?.maxLevel ?? 0

  const junkSetSourceTypes: Record<string, boolean> = {}
  for (const rule of activeRules) {
    if (EQUIPMENT_NODE_IDS.has(rule.categoryId) && rule.conditions?.setSourceTypes) {
      for (const st of rule.conditions.setSourceTypes) {
        junkSetSourceTypes[st] = true
      }
    }
  }

  return {
    weaponsAndArmor: action("weapons") || action("armor"),
    jewelry: action("jewelry"),
    maxQuality: d.equipment.maxQuality,
    maxLevel: equipMaxLevel,
    keepSetItems: d.equipment.keepSetItems,
    keepResearchable: d.equipment.keepResearchable,
    keepIntricate: d.equipment.keepIntricate,
    keepNirnhoned: d.equipment.keepNirnhoned,
    keepCrafted: d.equipment.keepCrafted,
    keepCompanion: d.equipment.keepCompanion,
    junkSetSourceTypes,
  }
}

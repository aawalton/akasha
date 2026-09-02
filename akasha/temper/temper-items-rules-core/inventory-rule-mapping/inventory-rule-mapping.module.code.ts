import { ITEM_CATEGORY_TREE } from "@akasha/temper-items-core/item-category-tree-data"
import type { ItemCategoryNode } from "@akasha/temper-items-core/item-category-tree-types"
import { buildConditionalActions } from "../conditional-actions/conditional-actions.module.code.ts"
import { buildCraftingMaterialActions } from "../crafting-material-actions/crafting-material-actions.module.code.ts"
import { buildEquipmentConfig } from "../equipment-config/equipment-config.module.code.ts"
import type {
  InventoryRuleSettings,
  ItemAction,
} from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryConfig } from "../inventory-settings-types/inventory-settings-types.module.code.ts"
import { INVENTORY_CONFIG_DEFAULTS } from "../inventory-settings-types/inventory-settings-types.module.code.ts"
import { buildItemCategoryActions } from "../item-category-actions/item-category-actions.module.code.ts"
import { resolveRuleConditionStates } from "../rule-condition-states/rule-condition-states.module.code.ts"
import { collectDestinations } from "../rule-destinations/rule-destinations.module.code.ts"
import { collectTraitActions } from "../trait-actions/trait-actions.module.code.ts"

export function rulesToInventoryConfig(
  settings: InventoryRuleSettings,
  categories: Record<string, ItemCategoryNode> = ITEM_CATEGORY_TREE
): InventoryConfig {
  const activeRules = settings.rules.filter((r) => r.active !== false)
  const states = resolveRuleConditionStates(activeRules, categories)

  const action = (nodeId: string): ItemAction | false => {
    return states.unconditional[nodeId] ?? false
  }

  return {
    ...buildItemCategoryActions(action, states),
    equipment: buildEquipmentConfig(activeRules, action),
    ...buildCraftingMaterialActions(action),
    dailyLogin: { ...INVENTORY_CONFIG_DEFAULTS.dailyLogin },
    ...buildConditionalActions(states),
    traitActions: collectTraitActions(activeRules),
    destinations: collectDestinations(activeRules),
  }
}

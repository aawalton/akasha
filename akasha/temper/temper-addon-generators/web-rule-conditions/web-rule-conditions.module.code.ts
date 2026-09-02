import { WEB_CAN_SELL_CONDITION } from "../web-rule-can-sell/web-rule-can-sell.module.code.ts"
import { WEB_COMBINED_LEVEL_HELPER } from "../web-rule-combined-level/web-rule-combined-level.module.code.ts"
import { WEB_COMPANION_EQUIP_CONDITION } from "../web-rule-companion-equip/web-rule-companion-equip.module.code.ts"
import { WEB_CONDITIONS_PREAMBLE } from "../web-rule-conditions-preamble/web-rule-conditions-preamble.module.code.ts"
import { WEB_CONTAINER_CONDITIONS } from "../web-rule-containers/web-rule-containers.module.code.ts"
import { WEB_CRAFTED_CONDITION } from "../web-rule-crafted/web-rule-crafted.module.code.ts"
import { WEB_INSPIRATION_CONDITION } from "../web-rule-inspiration/web-rule-inspiration.module.code.ts"
import { WEB_ITEM_FLAG_CONDITIONS } from "../web-rule-item-flags/web-rule-item-flags.module.code.ts"
import { WEB_ITEM_NAME_CONDITION } from "../web-rule-item-name/web-rule-item-name.module.code.ts"
import { WEB_KNOWLEDGE_CONDITIONS } from "../web-rule-knowledge/web-rule-knowledge.module.code.ts"
import { WEB_LEVEL_CONDITION } from "../web-rule-level/web-rule-level.module.code.ts"
import { WEB_POTION_DATA_HELPER } from "../web-rule-potion-data/web-rule-potion-data.module.code.ts"
import { WEB_POTION_EFFECT_CONDITIONS } from "../web-rule-potion-effects/web-rule-potion-effects.module.code.ts"
import { WEB_QUALITY_CONDITION } from "../web-rule-quality/web-rule-quality.module.code.ts"
import { WEB_RESEARCH_CONDITION } from "../web-rule-research/web-rule-research.module.code.ts"
import { WEB_SET_SOURCE_CONDITIONS } from "../web-rule-set-sources/web-rule-set-sources.module.code.ts"
import { WEB_STACK_FULLNESS_CONDITION } from "../web-rule-stack-fullness/web-rule-stack-fullness.module.code.ts"
import { WEB_TRAIT_CONDITIONS } from "../web-rule-traits/web-rule-traits.module.code.ts"
import { WEB_VALUE_CONDITIONS } from "../web-rule-value/web-rule-value.module.code.ts"
import { WEB_WANTED_AND_STOCK_CONDITIONS } from "../web-rule-wanted-and-stock/web-rule-wanted-and-stock.module.code.ts"

export function generateWebConditions(): string {
  return `${WEB_CONDITIONS_PREAMBLE}
// =============================================================================
// Private helpers
// =============================================================================

${WEB_COMBINED_LEVEL_HELPER}

${WEB_POTION_DATA_HELPER}

// =============================================================================
// Condition checking
// =============================================================================

/**
 * Check if an item passes the verifiable conditions of a category rule.
 * Conditions checkable from scan data (quality, level, value, stolen, bound)
 * are enforced fail-closed: if the field is absent, the item is excluded.
 * Computed conditions (isTargetEquip, traits, canUse, etc.) require a context
 * object — without it they pass through (same as before).
 * canResearch uses completion trait research data when available; passes through without it.
 * canInspire uses per-character crafting passive ranks when available; passes through without them.
 */
export function itemPassesConditions(
  item: InventoryItemData,
  conditions: CategoryRule["conditions"],
  context?: RuleMatcherContext
): boolean {
  if (!conditions) return true

${WEB_QUALITY_CONDITION}

${WEB_LEVEL_CONDITION}

${WEB_VALUE_CONDITIONS}

${WEB_ITEM_FLAG_CONDITIONS}

${WEB_STACK_FULLNESS_CONDITION}

${WEB_POTION_EFFECT_CONDITIONS}

${WEB_CAN_SELL_CONDITION}

${WEB_CRAFTED_CONDITION}

${WEB_KNOWLEDGE_CONDITIONS}

${WEB_ITEM_NAME_CONDITION}

  // =========================================================================
  // Computed conditions — require context, pass through without it
  // =========================================================================

${WEB_COMPANION_EQUIP_CONDITION}

${WEB_TRAIT_CONDITIONS}

${WEB_SET_SOURCE_CONDITIONS}

${WEB_RESEARCH_CONDITION}

${WEB_CONTAINER_CONDITIONS}

${WEB_INSPIRATION_CONDITION}

${WEB_WANTED_AND_STOCK_CONDITIONS}

  return true
}
`
}

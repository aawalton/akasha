"use client"

import type { CategoryRule, ItemRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { useMemo } from "react"
import {
  getCategoryRuleDescriptions,
  getItemRuleDescriptions,
} from "../inventory-rules-descriptions/inventory-rules-descriptions.module.code.ts"

interface RulePartition {
  active: readonly string[]
  inactive: readonly string[]
  duplicate: readonly string[]
  locked: readonly string[]
  unlocked: readonly string[]
}

export interface InventoryRulesTabDescriptions {
  characterActiveDescriptions: readonly string[]
  characterInactiveDescriptions: readonly string[]
  characterDuplicateDescriptions: readonly string[]
  characterUnlockedDescriptions: readonly string[]
  companionActiveDescriptions: readonly string[]
  companionInactiveDescriptions: readonly string[]
  companionDuplicateDescriptions: readonly string[]
  companionUnlockedDescriptions: readonly string[]
  categoryActiveDescriptions: readonly string[]
  categoryInactiveDescriptions: readonly string[]
  categoryDuplicateDescriptions: readonly string[]
  categoryUnlockedDescriptions: readonly string[]
  itemActiveDescriptions: readonly string[]
  itemInactiveDescriptions: readonly string[]
  itemUnlockedDescriptions: readonly string[]
}

interface UseInventoryRulesTabDescriptionsArgs {
  rules: readonly CategoryRule[]
  itemRules: readonly ItemRule[]
  characterPartition: RulePartition
  companionPartition: RulePartition
  categoryPartition: RulePartition
  activeItemRuleIds: readonly string[]
  inactiveItemRuleIds: readonly string[]
  unlockedItemRuleIds: readonly string[]
}

export function useInventoryRulesTabDescriptions({
  rules,
  itemRules,
  characterPartition,
  companionPartition,
  categoryPartition,
  activeItemRuleIds,
  inactiveItemRuleIds,
  unlockedItemRuleIds,
}: UseInventoryRulesTabDescriptionsArgs): InventoryRulesTabDescriptions {
  const characterActiveDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, characterPartition.active),
    [rules, characterPartition.active]
  )
  const characterInactiveDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, characterPartition.inactive),
    [rules, characterPartition.inactive]
  )
  const characterDuplicateDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, characterPartition.duplicate),
    [rules, characterPartition.duplicate]
  )
  const characterUnlockedDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, characterPartition.unlocked),
    [rules, characterPartition.unlocked]
  )
  const companionActiveDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, companionPartition.active),
    [rules, companionPartition.active]
  )
  const companionInactiveDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, companionPartition.inactive),
    [rules, companionPartition.inactive]
  )
  const companionDuplicateDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, companionPartition.duplicate),
    [rules, companionPartition.duplicate]
  )
  const companionUnlockedDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, companionPartition.unlocked),
    [rules, companionPartition.unlocked]
  )
  const categoryActiveDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, categoryPartition.active),
    [rules, categoryPartition.active]
  )
  const categoryInactiveDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, categoryPartition.inactive),
    [rules, categoryPartition.inactive]
  )
  const categoryDuplicateDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, categoryPartition.duplicate),
    [rules, categoryPartition.duplicate]
  )
  const categoryUnlockedDescriptions = useMemo(
    () => getCategoryRuleDescriptions(rules, categoryPartition.unlocked),
    [rules, categoryPartition.unlocked]
  )
  const itemActiveDescriptions = useMemo(
    () => getItemRuleDescriptions(itemRules, activeItemRuleIds),
    [itemRules, activeItemRuleIds]
  )
  const itemInactiveDescriptions = useMemo(
    () => getItemRuleDescriptions(itemRules, inactiveItemRuleIds),
    [itemRules, inactiveItemRuleIds]
  )
  const itemUnlockedDescriptions = useMemo(
    () => getItemRuleDescriptions(itemRules, unlockedItemRuleIds),
    [itemRules, unlockedItemRuleIds]
  )

  return {
    characterActiveDescriptions,
    characterInactiveDescriptions,
    characterDuplicateDescriptions,
    characterUnlockedDescriptions,
    companionActiveDescriptions,
    companionInactiveDescriptions,
    companionDuplicateDescriptions,
    companionUnlockedDescriptions,
    categoryActiveDescriptions,
    categoryInactiveDescriptions,
    categoryDuplicateDescriptions,
    categoryUnlockedDescriptions,
    itemActiveDescriptions,
    itemInactiveDescriptions,
    itemUnlockedDescriptions,
  }
}

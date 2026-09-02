interface PanelVisibilityInput {
  hasAnyFilter: boolean
  visibleCharacterRuleIds: Set<string> | null
  visibleControlledCharacterRuleIds: Set<string> | null
  visibleCompanionRuleIds: Set<string> | null
  visibleControlledCompanionRuleIds: Set<string> | null
  visibleCategoryRuleIds: Set<string> | null
  visibleItemRuleIds: Set<string> | null
}

export interface InventoryRulePanelVisibility {
  hideCharacterPanel: boolean
  hideCompanionPanel: boolean
  hideCategoryPanel: boolean
  hideItemPanel: boolean
}

export function inventoryRulePanelVisibility({
  hasAnyFilter,
  visibleCharacterRuleIds,
  visibleControlledCharacterRuleIds,
  visibleCompanionRuleIds,
  visibleControlledCompanionRuleIds,
  visibleCategoryRuleIds,
  visibleItemRuleIds,
}: PanelVisibilityInput): InventoryRulePanelVisibility {
  const hideCharacterPanel =
    hasAnyFilter &&
    (visibleCharacterRuleIds?.size ?? 0) === 0 &&
    (visibleControlledCharacterRuleIds?.size ?? 0) === 0
  const hideCompanionPanel =
    hasAnyFilter &&
    (visibleCompanionRuleIds?.size ?? 0) === 0 &&
    (visibleControlledCompanionRuleIds?.size ?? 0) === 0
  const hideCategoryPanel = hasAnyFilter && (visibleCategoryRuleIds?.size ?? 0) === 0
  const hideItemPanel = hasAnyFilter && (visibleItemRuleIds?.size ?? 0) === 0

  return { hideCharacterPanel, hideCompanionPanel, hideCategoryPanel, hideItemPanel }
}

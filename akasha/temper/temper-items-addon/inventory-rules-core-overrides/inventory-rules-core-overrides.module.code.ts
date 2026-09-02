import type { CharacterScope } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
export function isItemKnown(itemLink: string, itemType: number): boolean | undefined {
  if (itemType === ITEMTYPE_RECIPE) {
    return IsItemLinkRecipeKnown(itemLink)
  }
  const useType = GetItemLinkItemUseType(itemLink)
  if (useType === ITEM_USE_TYPE_COLLECTIBLE_GRANT) {
    const collectibleId = GetItemLinkItemUseReferenceId(itemLink)
    return IsCollectibleUnlocked(collectibleId)
  }
  if (useType === ITEM_USE_TYPE_CRAFTED_ABILITY_SCRIPT) {
    return IsCraftedAbilityScriptUnlocked(GetItemLinkItemUseReferenceId(itemLink))
  }
  const [, specializedType] = GetItemLinkItemType(itemLink)
  if (
    specializedType === SPECIALIZED_ITEMTYPE_RACIAL_STYLE_MOTIF_BOOK ||
    specializedType === SPECIALIZED_ITEMTYPE_RACIAL_STYLE_MOTIF_CHAPTER
  ) {
    return IsItemLinkBookKnown(itemLink)
  }
  if (
    specializedType === SPECIALIZED_ITEMTYPE_TROPHY_COLLECTIBLE_FRAGMENT ||
    specializedType === SPECIALIZED_ITEMTYPE_TROPHY_RUNEBOX_FRAGMENT
  ) {
    const grantedCollectibleId = GetItemLinkContainerCollectibleId(itemLink)
    if (grantedCollectibleId === 0) return undefined
    return IsCollectibleOwnedByDefId(grantedCollectibleId)
  }
  if (specializedType === SPECIALIZED_ITEMTYPE_COLLECTIBLE_STYLE_PAGE) {
    const grantedCollectibleId = GetItemLinkContainerCollectibleId(itemLink)
    if (grantedCollectibleId === 0) return undefined
    return IsCollectibleUnlocked(grantedCollectibleId)
  }
  return undefined
}

export function isKnowledgeItemLink(itemLink: string, itemType: number): boolean {
  if (itemType === ITEMTYPE_RECIPE) return true
  const useType = GetItemLinkItemUseType(itemLink)
  if (
    useType === ITEM_USE_TYPE_COLLECTIBLE_GRANT ||
    useType === ITEM_USE_TYPE_CRAFTED_ABILITY_SCRIPT
  ) {
    return true
  }
  const [, specializedType] = GetItemLinkItemType(itemLink)
  return (
    specializedType === SPECIALIZED_ITEMTYPE_RACIAL_STYLE_MOTIF_BOOK ||
    specializedType === SPECIALIZED_ITEMTYPE_RACIAL_STYLE_MOTIF_CHAPTER ||
    specializedType === SPECIALIZED_ITEMTYPE_TROPHY_COLLECTIBLE_FRAGMENT ||
    specializedType === SPECIALIZED_ITEMTYPE_TROPHY_RUNEBOX_FRAGMENT ||
    specializedType === SPECIALIZED_ITEMTYPE_COLLECTIBLE_STYLE_PAGE
  )
}

export function isItemUnlockable(
  itemLink: string,
  itemType: number,
  scope?: CharacterScope
): boolean | undefined {
  const useType = GetItemLinkItemUseType(itemLink)
  if (useType === ITEM_USE_TYPE_COLLECTIBLE_GRANT) {
    const collectibleId = GetItemLinkItemUseReferenceId(itemLink)
    return !IsCollectibleUnlocked(collectibleId)
  }
  if (useType === ITEM_USE_TYPE_CRAFTED_ABILITY_SCRIPT) {
    return !IsCraftedAbilityScriptUnlocked(GetItemLinkItemUseReferenceId(itemLink))
  }
  if (itemType === ITEMTYPE_RECIPE) {
    if (scope == null || scope === "current-character") {
      return !IsItemLinkRecipeKnown(itemLink)
    }
    return !IsItemLinkRecipeKnown(itemLink)
  }
  const [, specializedType] = GetItemLinkItemType(itemLink)
  if (
    specializedType === SPECIALIZED_ITEMTYPE_RACIAL_STYLE_MOTIF_BOOK ||
    specializedType === SPECIALIZED_ITEMTYPE_RACIAL_STYLE_MOTIF_CHAPTER
  ) {
    return !IsItemLinkBookKnown(itemLink)
  }
  if (
    specializedType === SPECIALIZED_ITEMTYPE_TROPHY_COLLECTIBLE_FRAGMENT ||
    specializedType === SPECIALIZED_ITEMTYPE_TROPHY_RUNEBOX_FRAGMENT
  ) {
    const grantedCollectibleId = GetItemLinkContainerCollectibleId(itemLink)
    if (grantedCollectibleId === 0) return undefined
    return CanCombinationFragmentBeUnlocked(grantedCollectibleId)
  }
  if (specializedType === SPECIALIZED_ITEMTYPE_COLLECTIBLE_STYLE_PAGE) {
    const grantedCollectibleId = GetItemLinkContainerCollectibleId(itemLink)
    if (grantedCollectibleId === 0) return undefined
    return !IsCollectibleUnlocked(grantedCollectibleId)
  }
  return undefined
}

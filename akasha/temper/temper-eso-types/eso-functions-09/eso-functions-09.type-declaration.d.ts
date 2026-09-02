declare function IsItemLinkUniqueEquipped(this: void, itemLink?: string): boolean
declare function GetItemLinkEquipType(this: void, itemLink?: string): EquipType
declare function GetItemLinkCraftingSkillType(this: void, itemLink?: string): TradeskillType
declare function GetItemLinkEnchantingRuneName(
  this: void,
  itemLink?: string
): LuaMultiReturn<[known: boolean | undefined, name: string | undefined]>
declare function GetItemLinkEnchantingRuneClassification(
  this: void,
  itemLink?: string
): EnchantingRuneClassification
declare function IsItemLinkBound(this: void, itemLink?: string): boolean
declare function GetItemLinkBindType(this: void, itemLink?: string): BindType
declare function GetItemLinkGlyphMinLevels(
  this: void,
  itemLink?: string
): LuaMultiReturn<[minLevel: number | undefined, minChampionPoints: number | undefined]>
declare function IsItemLinkBookKnown(this: void, itemLink?: string): boolean
declare function IsItemLinkRecipeKnown(this: void, itemLink?: string): boolean
declare function GetItemLinkRecipeResultItemLink(
  this: void,
  itemLink?: string,
  linkStyle?: number
): string
declare function GetItemLinkRecipeNumIngredients(this: void, itemLink?: string): number
declare function GetItemLinkRecipeIngredientInfo(
  this: void,
  itemLink?: string,
  index?: number
): LuaMultiReturn<
  [ingredientName: string, amountInInventoryAndBank: number, amountRequired: number]
>
declare function GetItemLinkRecipeIngredientItemLink(
  this: void,
  itemLink?: string,
  index?: number,
  linkStyle?: number
): string
declare function GetItemLinkReagentTraitInfo(
  this: void,
  itemLink?: string,
  index?: number
): LuaMultiReturn<[known: boolean | undefined, name: string | undefined]>
declare function GetItemLinkItemStyle(this: void, itemLink?: string): number
declare function GetItemLinkRefinedMaterialItemLink(
  this: void,
  itemLink?: string,
  linkStyle?: number
): string
declare function IsItemLinkReconstructed(this: void, itemLink?: string): boolean
declare function IsItemLinkStolen(this: void, itemLink?: string): boolean
declare function CanItemLinkBeUsedToLearn(this: void, itemLink?: string): boolean
declare function IsItemLinkContainer(this: void, itemLink?: string): boolean
declare function GetItemLinkStacks(
  this: void,
  itemLink?: string
): LuaMultiReturn<
  [
    stackCountBackpack: number,
    stackCountBank: number,
    stackCountCraftBag: number,
    stackCountHouseBanks: number,
    stackCountFurnitureVault: number,
    stackCountVengeanceBag: number,
  ]
>
declare function GetItemLinkInventoryCount(
  this: void,
  itemLink?: string,
  countType?: InventoryCountBagOption
): number
declare function CanItemLinkBeVirtual(this: void, itemLink?: string): boolean
declare function GetItemLinkFurnitureDataId(this: void, itemLink?: string): number
declare function GetItemLinkGrantedRecipeIndices(
  this: void,
  itemLink?: string
): LuaMultiReturn<[recipeListIndex: number | undefined, recipeIndex: number | undefined]>
declare function GetItemLinkActorCategory(this: void, itemLink?: string): GameplayActorCategory
declare function GetItemLinkTradingHouseItemSearchName(this: void, itemLink?: string): string
declare function GetItemLinkContainerCollectibleId(this: void, itemLink?: string): number
declare function IsItemStolen(this: void, bagId?: Bag, slotIndex?: number): boolean
declare function AreAnyItemsStolen(this: void, bagId?: Bag): boolean
declare const StackBag: (this: void, bagId?: Bag) => void
declare function GetItemLinkNumItemTags(this: void, itemLink?: string): number
declare function GetItemLinkItemTagInfo(
  this: void,
  itemLink?: string,
  itemTagIndex?: number
): LuaMultiReturn<[itemTagDescription: string, itemTagCategory: ItemTagCategory]>
declare function GetNumCrownGemsFromItemManualGemification(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[itemsRequired: number, gemsAwarded: number]>
declare function IsItemFromCrownCrate(this: void, bagId?: Bag, slotIndex?: number): boolean
declare function GetItemBindType(this: void, bagId?: Bag, slotIndex?: number): BindType
declare function IsHouseBankBag(this: void, bagId?: Bag): boolean
declare function IsFurnitureVault(this: void, bagId?: Bag): boolean
declare function GetCurrentBankUpgrade(this: void): number
declare function GetMaxBankUpgrade(this: void): number
declare function IsCurrencyValid(this: void, currencyType?: CurrencyType): boolean
declare function CanCurrencyBeStoredInLocation(
  this: void,
  currencyType?: CurrencyType,
  currencyLocation?: CurrencyLocation
): boolean
declare function GetCurrencyName(
  this: void,
  currencyType?: CurrencyType,
  isSingular?: boolean,
  isLower?: boolean
): string
declare function GetCurrencyDescription(this: void, currencyType?: CurrencyType): string
declare function GetCurrencyKeyboardIcon(
  this: void,
  currencyType?: CurrencyType
): LuaMultiReturn<[iconPath: string, percentOfLineSize: number]>
declare function GetCurrencyGamepadIcon(
  this: void,
  currencyType?: CurrencyType
): LuaMultiReturn<[iconPath: string, percentOfLineSize: number]>
declare function IsCollectibleBlacklisted(this: void, collectibleId?: number): boolean
declare function GetNumCollectibleCategories(this: void): number
declare function GetCollectibleCategoryInfo(
  this: void,
  topLevelIndex?: number
): LuaMultiReturn<
  [
    name: string,
    numSubCatgories: number,
    numCollectibles: number,
    unlockedCollectibles: number,
    totalCollectibles: number,
    hidesLocked: boolean,
  ]
>
declare function GetCollectibleCategoryId(
  this: void,
  topLevelIndex?: number,
  subCategoryIndex?: number | undefined
): number
declare function GetCollectibleSubCategoryInfo(
  this: void,
  topLevelIndex?: number,
  subCategoryIndex?: number
): LuaMultiReturn<
  [name: string, numCollectibles: number, unlockedCollectibles: number, totalCollectibles: number]
>
declare function GetCollectibleId(
  this: void,
  topLevelIndex?: number,
  categoryIndex?: number | undefined,
  collectibleIndex?: number
): number
declare function GetCollectibleInfo(
  this: void,
  collectibleId?: number
): LuaMultiReturn<
  [
    name: string,
    description: string,
    icon: string,
    deprecatedLockedIcon: string,
    unlocked: boolean,
    purchasable: boolean,
    isActive: boolean,
    categoryType: CollectibleCategoryType,
    hint: string,
  ]
>
declare function GetCollectibleDescription(this: void, collectibleId?: number): string
declare function GetCollectibleCategoryType(
  this: void,
  collectibleId?: number
): CollectibleCategoryType
declare function GetCollectibleIcon(this: void, collectibleId?: number): string
declare function GetCategoryInfoFromCollectibleId(
  this: void,
  collectibleId?: number
): LuaMultiReturn<
  [
    topLevelIndex: number | undefined,
    categoryIndex: number | undefined,
    collectibleIndex: number | undefined,
  ]
>
declare function GetCategoryInfoFromCollectibleCategoryId(
  this: void,
  collectibleCategoryId?: number
): LuaMultiReturn<[topLevelIndex: number | undefined, categoryIndex: number | undefined]>
declare function GetTotalCollectiblesByCategoryType(
  this: void,
  collectibleCategoryType?: CollectibleCategoryType
): number
declare function GetCollectibleIdFromType(
  this: void,
  collectibleCategoryType?: CollectibleCategoryType,
  index?: number
): number
declare function IsCollectibleBlocked(
  this: void,
  collectibleId?: number,
  actorCategory?: GameplayActorCategory
): boolean
declare function GetCollectibleBlockReason(
  this: void,
  collectibleId?: number,
  actorCategory?: GameplayActorCategory
): CollectibleUsageBlockReason
declare function IsCollectibleUsable(
  this: void,
  collectibleId?: number,
  actorCategory?: GameplayActorCategory
): boolean
declare function GetCollectibleHint(this: void, collectibleId?: number): string
declare const UseCollectible: (
  this: void,
  collectibleId?: number,
  actorCategory?: GameplayActorCategory
) => void
declare function GetCollectibleLink(this: void, collectibleId?: number, linkStyle?: number): string
declare function GetCollectibleIdFromLink(this: void, link?: string): number | undefined
declare function GetCollectibleNickname(this: void, collectibleId?: number): string
declare function IsCollectibleUnlocked(this: void, collectibleId?: number): boolean
declare const SetOrClearCollectibleUserFlag: (
  this: void,
  collectibleId?: number,
  userFlag?: CollectibleUserFlags,
  isSet?: boolean
) => void
declare function GetCollectibleUserFlags(this: void, collectibleId?: number): CollectibleUserFlags
declare function IsCollectibleActive(
  this: void,
  collectibleId?: number,
  actorCategory?: GameplayActorCategory
): boolean
declare function IsCollectibleOwnedByDefId(this: void, collectibleId?: number): boolean
declare function GetFurnitureVaultCollectibleId(this: void): number
declare function GetActiveCollectibleByType(
  this: void,
  categoryType?: CollectibleCategoryType,
  actorCategory?: GameplayActorCategory
): number
declare function GetCollectibleCooldownAndDuration(
  this: void,
  collectibleId?: number
): LuaMultiReturn<[cooldownRemaining: number, cooldownDuration: number]>
declare function GetCollectibleFurnitureDataId(this: void, collectibleId?: number): number
declare function GetCollectibleReferenceId(this: void, collectibleId?: number): number
declare function GetCollectibleForBag(this: void, bagId?: Bag): number
declare function CanCombinationFragmentBeUnlocked(this: void, collectibleId?: number): boolean
declare function IsCollectibleTributePatronBookCardUpgraded(
  this: void,
  patronId?: number,
  cardIndex?: number
): boolean
declare function GetQuestZoneId(this: void, questId?: number): number
declare function GetQuestName(this: void, questId?: number): string
declare function GetDyeInfoById(
  this: void,
  dyeId?: number
): LuaMultiReturn<
  [
    dyeName: string,
    known: boolean,
    rarity: DyeRarity,
    hueCategory: DyeHueCategory,
    achievementId: number,
    r: number,
    g: number,
    b: number,
    sortKey: number,
  ]
>
declare function GetNumUnlockedOutfits(this: void, actorCategory?: GameplayActorCategory): number
declare function IsCharacterPreviewingAvailable(this: void): boolean
declare const RequestJumpToHouse: (this: void, houseId?: number, jumpOutside?: boolean) => void
declare function ClearCursor(this: void): boolean
declare function GetCursorContentType(this: void): number
declare function GetCraftingSkillName(this: void, craftingSkillType?: TradeskillType): string
declare function GetFurnitureCategoryName(this: void, furnitureCategoryId?: number): string
declare function GetFurnitureDataCategoryInfo(
  this: void,
  furnitureDataId?: number
): LuaMultiReturn<[categoryId: number | undefined, subcategoryId: number | undefined]>
declare function GetCollectibleIdForHouse(this: void, houseId?: number): number
declare function IsInteractionUsingInteractCamera(this: void): boolean
declare function GetInteractionType(this: void): InteractionType
declare function GetUniversalStyleId(this: void): number
declare function GetItemStyleName(this: void, styleId?: number): string
declare function GetJewelrycraftingCollectibleId(this: void): number
declare function GetNumEmotes(this: void): number
declare function GetEmoteIndex(this: void, emoteId?: number): number | undefined
declare function GetEmoteInfo(
  this: void,
  emoteIndex?: number
): LuaMultiReturn<
  [
    slashName: string,
    category: EmoteCategory,
    emoteId: number,
    displayName: string,
    showInGamepadUI: boolean,
  ]
>
declare function GetEmoteCollectibleId(this: void, emoteIndex?: number): number | undefined
declare const PlayEmoteByIndex: (this: void, emoteIndex?: number) => void
declare function GetEmoteCategoryKeyboardIcons(
  this: void,
  category?: EmoteCategory
): LuaMultiReturn<
  [unpressedButtonIcon: string, pressedButtonIcon: string, mouseoverButtonIcon: string]
>
declare function GetItemRewardItemLink(
  this: void,
  rewardId?: number,
  quantity?: number,
  displayFlags?: RewardDisplayFlags,
  linkStyle?: number
): string
declare function GetItemRewardItemId(this: void, rewardId?: number): number
declare function GetTimeUntilNextDailyLoginRewardClaimS(this: void): number
declare function GetZoneId(this: void, zoneIndex?: number): number
declare function GetParentZoneId(this: void, zoneId?: number): number
declare function GetZoneIndex(this: void, zoneId?: number): number
declare function GetZoneNameById(this: void, zoneId?: number): string
declare function GetAchievementName(this: void, achievementId?: number): string
declare function GetAchievementInfo(
  this: void,
  achievementId?: number
): LuaMultiReturn<
  [
    name: string,
    description: string,
    points: number,
    icon: string,
    completed: boolean,
    date: string,
    time: string,
  ]
>
declare function GetAchievementNumCriteria(this: void, achievementId?: number): number
declare function GetAchievementCriterion(
  this: void,
  achievementId?: number,
  criterionIndex?: number
): LuaMultiReturn<[description: string, numCompleted: number, numRequired: number]>
declare function GetAchievementRewardTitle(
  this: void,
  achievementId?: number
): LuaMultiReturn<[hasRewardOfType: boolean, titleName: string]>
declare function GetAchievementPersistenceLevel(
  this: void,
  achievementId?: number
): AchievementPersistenceLevel
declare function IsAchievementComplete(this: void, achievementId?: number): boolean
declare function DoesAntiquityNeedCombination(this: void, antiquityId?: number): boolean
declare function GetNumAntiquityLoreEntries(this: void, antiquityId?: number): number
declare function GetAntiquityName(this: void, antiquityId?: number): string
declare function GetAntiquityQuality(this: void, antiquityId?: number): AntiquityQuality
declare function GetAntiquityRewardId(this: void, antiquityId?: number): number

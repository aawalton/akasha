declare function GetRecipeResultItemInfo(
  this: void,
  recipeListIndex?: number,
  recipeIndex?: number
): LuaMultiReturn<
  [name: string, icon: string, stack: number, sellPrice: number, displayQuality: ItemDisplayQuality]
>
declare function GetRecipeResultItemLink(
  this: void,
  recipeListIndex?: number,
  recipeIndex?: number,
  linkStyle?: number
): string
declare function GetRecipeResultQuantity(
  this: void,
  recipeListIndex?: number,
  recipeIndex?: number,
  numIterations?: number
): number
declare function GetMaxIterationsPossibleForRecipe(
  this: void,
  recipeListIndex?: number,
  recipeIndex?: number
): LuaMultiReturn<[maxIterations: number, limitReason: TradeskillResult]>
declare const CraftProvisionerItem: (
  this: void,
  recipeListIndex?: number,
  recipeIndex?: number,
  numIterations?: number
) => void
declare function GetCurrentRecipeIngredientCount(
  this: void,
  recipeListIndex?: number,
  recipeIndex?: number,
  ingredientIndex?: number
): number
declare function GetRecipeInfoFromItemId(
  this: void,
  itemId?: number
): LuaMultiReturn<
  [
    craftingStationType: TradeskillType | undefined,
    recipeListIndex: number | undefined,
    recipeIndex: number | undefined,
  ]
>
declare function GetMaxIterationsPossibleForEnchantingItem(
  this: void,
  potencyRuneBagId?: Bag,
  potencyRuneSlotIndex?: number,
  essenceRuneBagId?: Bag,
  essenceRuneSlotIndex?: number,
  aspectRuneBagId?: Bag,
  aspectRuneSlotIndex?: number
): LuaMultiReturn<[numIterations: number, limitReason: TradeskillResult]>
declare const CraftEnchantingItem: (
  this: void,
  potencyRuneBagId?: Bag,
  potencyRuneSlotIndex?: number,
  essenceRuneBagId?: Bag,
  essenceRuneSlotIndex?: number,
  aspectRuneBagId?: Bag,
  aspectRuneSlotIndex?: number,
  numIterations?: number
) => void
declare function GetEnchantingResultingItemLink(
  this: void,
  potencyRuneBagId?: Bag,
  potencyRuneSlotIndex?: number,
  essenceRuneBagId?: Bag,
  essenceRuneSlotIndex?: number,
  aspectRuneBagId?: Bag,
  aspectRuneSlotIndex?: number,
  linkStyle?: number
): string
declare function GetRunestoneSoundInfo(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[soundName: string, soundLength: number]>
declare function GetEnchantSearchCategoryType(
  this: void,
  enchantId?: number
): EnchantmentSearchCategoryType
declare const RequestScribe: (
  this: void,
  craftedAbilityId?: number,
  primaryScriptId?: number,
  secondaryScriptId?: number,
  tertiaryScriptId?: number
) => void
declare const SetCraftedAbilityScriptSelectionOverride: (
  this: void,
  craftedAbilityId?: number,
  primaryScriptId?: number,
  secondaryScriptId?: number,
  tertiaryScriptId?: number
) => void
declare function IsCraftedAbilityScriptCompatibleWithSelections(
  this: void,
  checkScriptId?: number,
  craftedAbilityId?: number,
  selectedPrimaryScriptId?: number,
  selectedSecondaryScriptId?: number,
  selectedTertiaryScriptId?: number
): boolean
declare const ResetCraftedAbilityScriptSelectionOverride: (this: void) => void
declare function IsScribingEnabled(this: void): boolean
declare function GetNumCraftedAbilities(this: void): number
declare function GetCraftedAbilityIdAtIndex(this: void, index?: number): number
declare function GetScribingInkItemLink(this: void, linkStyle?: number): string
declare function GetCostToScribeScripts(
  this: void,
  craftedAbilityId?: number,
  primaryScriptId?: number,
  secondaryScriptId?: number,
  tertiaryScriptId?: number
): number
declare function IsScribableScriptCombinationForCraftedAbility(
  this: void,
  craftedAbilityId?: number,
  selectedPrimaryScriptId?: number,
  selectedSecondaryScriptId?: number,
  selectedTertiaryScriptId?: number
): boolean
declare function IsCraftedAbilityScribed(this: void, craftedAbilityId?: number): boolean
declare function IsCraftedAbilityScriptUnlocked(
  this: void,
  craftedAbilityScriptId?: number
): boolean
declare function GetAbilityIdForCraftedAbilityId(this: void, craftedAbilityId?: number): number
declare function GetSkillTypeForCraftedAbilityId(this: void, craftedAbilityId?: number): SkillType
declare function GetCraftedAbilityActiveScriptIds(
  this: void,
  craftedAbilityId?: number
): LuaMultiReturn<[primaryScriptId: number, secondaryScriptId: number, tertiaryScriptId: number]>
declare function IsCraftedAbilityUnlocked(this: void, craftedAbilityId?: number): boolean
declare function GetNumScriptsInSlotForCraftedAbility(
  this: void,
  craftedAbilityId?: number,
  slotType?: ScribingSlot
): number
declare function GetScriptIdAtSlotIndexForCraftedAbility(
  this: void,
  craftedAbilityId?: number,
  slotType?: ScribingSlot,
  index?: number
): number
declare function GetCraftedAbilityScriptDisplayName(
  this: void,
  craftedAbilityScriptId?: number
): string
declare function GetCraftedAbilityScriptDescription(
  this: void,
  craftedAbilityId?: number,
  craftedAbilityScriptId?: number
): string
declare function GetCraftedAbilityScriptIcon(this: void, craftedAbilityScriptId?: number): string
declare function GetCraftedAbilityScriptAcquireHint(
  this: void,
  craftedAbilityScriptId?: number
): string
declare function GetCraftedAbilityScriptScribingSlot(
  this: void,
  craftedAbilityScriptId?: number
): ScribingSlot
declare function GetCraftedAbilityDisplayName(this: void, craftedAbilityId?: number): string
declare function GetCraftedAbilityDescription(this: void, craftedAbilityId?: number): string
declare function GetCraftedAbilityIcon(this: void, craftedAbilityId?: number): string
declare function GetCraftedAbilityAcquireHint(this: void, craftedAbilityId?: number): string
declare function GetCraftedAbilityRepresentativeAbilityId(
  this: void,
  craftedAbilityId?: number,
  casterUnitTag?: string
): number
declare function IsSmithingCraftingType(this: void, tradeskillType?: TradeskillType): boolean
declare function GetMaxIterationsPossibleForSmithingItem(
  this: void,
  patternIndex?: number,
  materialIndex?: number,
  materialQuantity?: number,
  itemStyleId?: number,
  traitIndex?: number,
  useUniversalStyleItem?: boolean
): LuaMultiReturn<[numIterations: number, limitReason: TradeskillResult]>
declare const CraftSmithingItem: (
  this: void,
  patternIndex?: number,
  materialIndex?: number,
  materialQuantity?: number,
  itemStyleId?: number,
  traitIndex?: number,
  useUniversalStyleItem?: boolean,
  numIterations?: number
) => void
declare function GetSmithingPatternResultLink(
  this: void,
  patternIndex?: number,
  materialIndex?: number,
  materialQuantity?: number,
  itemStyleId?: number,
  traitIndex?: number,
  linkStyle?: number
): string
declare function GetNumSmithingPatterns(this: void): number
declare function GetSmithingPatternMaterialItemInfo(
  this: void,
  patternIndex?: number,
  materialIndex?: number
): LuaMultiReturn<
  [
    itemName: string,
    icon: string,
    stack: number,
    sellPrice: number,
    meetsUsageRequirement: boolean,
    equipType: EquipType,
    itemStyleId: number,
    displayQuality: ItemDisplayQuality,
    itemInstanceId: number,
    skillRequirement: number,
    createsItemOfLevel: number,
    isChampionPoint: boolean,
  ]
>
declare function GetSmithingPatternMaterialItemLink(
  this: void,
  patternIndex?: number,
  materialIndex?: number,
  linkStyle?: number
): string
declare function GetCurrentSmithingMaterialItemCount(
  this: void,
  patternIndex?: number,
  materialIndex?: number
): number
declare function GetHighestItemStyleId(this: void): number
declare function GetItemStyleMaterialLink(
  this: void,
  itemStyleId?: number,
  linkStyle?: number
): string
declare function GetCurrentSmithingStyleItemCount(this: void, itemStyleId?: number): number
declare function IsSmithingStyleKnown(
  this: void,
  itemStyleId?: number,
  patternIndex?: number
): boolean
declare function GetNumSmithingTraitItems(this: void): number
declare function GetSmithingTraitItemInfo(
  this: void,
  traitItemIndex?: number
): LuaMultiReturn<
  [
    traitType: ItemTraitType | undefined,
    itemName: string,
    icon: string,
    sellPrice: number,
    meetsUsageRequirement: boolean,
    itemStyleId: number,
    displayQuality: ItemDisplayQuality,
  ]
>
declare function GetSmithingTraitItemLink(
  this: void,
  traitItemIndex?: number,
  linkStyle?: number
): string
declare function GetCurrentSmithingTraitItemCount(this: void, traitItemIndex?: number): number
declare function GetNumSmithingResearchLines(this: void, craftingSkillType?: TradeskillType): number
declare function GetMaxSimultaneousSmithingResearch(
  this: void,
  craftingSkillType?: TradeskillType
): number
declare function GetSmithingResearchLineInfo(
  this: void,
  craftingSkillType?: TradeskillType,
  researchLineIndex?: number
): LuaMultiReturn<
  [name: string, icon: string, numTraits: number, timeRequiredForNextResearchSecs: number]
>
declare function GetSmithingResearchLineTraitInfo(
  this: void,
  craftingSkillType?: TradeskillType,
  researchLineIndex?: number,
  traitIndex?: number
): LuaMultiReturn<[traitType: ItemTraitType, traitDescription: string, known: boolean]>
declare function GetSmithingResearchLineTraitTimes(
  this: void,
  craftingSkillType?: TradeskillType,
  researchLineIndex?: number,
  traitIndex?: number
): LuaMultiReturn<[duration: number | undefined, timeRemainingSecs: number | undefined]>
declare function CanItemBeSmithingTraitResearched(
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  craftingSkillType?: TradeskillType,
  researchLineIndex?: number,
  traitIndex?: number
): boolean
declare function CanItemLinkBeTraitResearched(this: void, itemLink?: string): boolean
declare const ResearchSmithingTrait: (this: void, bagId?: Bag, slotIndex?: number) => void
declare function CanItemBeDeconstructed(
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  craftingSkillType?: TradeskillType | undefined
): boolean
declare function GetRequiredSmithingRefinementStackSize(this: void): number
declare function CanItemBeSmithingImproved(
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  craftingSkillType?: TradeskillType
): boolean
declare function GetSmithingImprovementChance(
  this: void,
  itemToImproveBagId?: Bag,
  itemToImproveSlotIndex?: number,
  numBoostersToUse?: number,
  craftingSkillType?: TradeskillType
): number
declare function GetSmithingImprovementItemInfo(
  this: void,
  craftingSkillType?: TradeskillType,
  improvementItemIndex?: number
): LuaMultiReturn<
  [
    itemName: string,
    icon: string,
    currentStack: number,
    sellPrice: number,
    meetsUsageRequirement: boolean,
    equipType: EquipType,
    itemStyleId: number,
    functionalQuality: ItemQuality,
    displayQuality: ItemDisplayQuality,
  ]
>
declare function GetSmithingImprovementItemLink(
  this: void,
  craftingSkillType?: TradeskillType,
  improvementItemIndex?: number,
  linkStyle?: number
): string
declare function GetSmithingGuaranteedImprovementItemAmount(
  this: void,
  craftingSkillType?: TradeskillType,
  improvementItemIndex?: number
): number
declare function GetSmithingImprovedItemLink(
  this: void,
  itemToImproveBagId?: Bag,
  itemToImproveSlotIndex?: number,
  craftingSkillType?: TradeskillType,
  linkStyle?: number
): string
declare const ImproveSmithingItem: (
  this: void,
  itemToImproveBagId?: Bag,
  itemToImproveSlotIndex?: number,
  numBoostersToUse?: number
) => void
declare function GetNumValidItemStyles(this: void): number
declare function GetValidItemStyleId(this: void, index?: number): number
declare function GetNumConsolidatedSmithingSets(this: void): number
declare function GetNumUnlockedConsolidatedSmithingSets(this: void): number
declare function IsConsolidatedSmithingSetIndexUnlocked(this: void, setIndex?: number): boolean
declare function IsConsolidatedSmithingItemSetIdUnlocked(this: void, itemSetId?: number): boolean
declare function GetConsolidatedSmithingItemSetIdByIndex(this: void, setIndex?: number): number
declare const SetActiveConsolidatedSmithingSetByIndex: (
  this: void,
  setIndex?: number | undefined
) => void
declare function GetActiveConsolidatedSmithingItemSetId(this: void): number
declare function GetNonCombatBonus(this: void, nonCombatBonus?: NonCombatBonusType): number
declare function GetActivityInfo(
  this: void,
  activityId?: number
): LuaMultiReturn<
  [
    name: string,
    levelMin: number,
    levelMax: number,
    championPointsMin: number,
    championPointsMax: number,
    groupType: LFGGroupType,
    minGroupSize: number,
    description: string,
    sortOrder: number,
  ]
>
declare function GetNumActivitiesByType(this: void, activity?: LFGActivity): number
declare function GetActivityIdByTypeAndIndex(
  this: void,
  activity?: LFGActivity,
  index?: number
): number
declare const UpdateSelectedLFGRole: (this: void, role?: LFGRole) => void
declare function GetSelectedLFGRole(this: void): LFGRole
declare function CanUpdateSelectedLFGRole(this: void): boolean
declare function GetRequiredActivityCollectibleId(this: void, activityId?: number): number
declare function GetNumFishingLures(this: void): number
declare function GetFishingLureInfo(
  this: void,
  lureIndex?: number
): LuaMultiReturn<
  [name: string, icon: string, stack: number, sellPrice: number, quality: ItemQuality]
>
declare function GetTreasureMapInfo(
  this: void,
  treasureMapIndex?: number
): LuaMultiReturn<[name: string, imagePath: string]>
declare const SetFloatingMarkerGlobalAlpha: (this: void, alpha?: number) => void
declare function GetOutfitName(
  this: void,
  actorCategory?: GameplayActorCategory,
  outfitIndex?: number
): string
declare function GetOutfitSlotInfo(
  this: void,
  actorCategory?: GameplayActorCategory,
  outfitIndex?: number,
  outfitSlot?: OutfitSlot
): LuaMultiReturn<
  [
    collectibleId: number,
    itemMaterialIndex: number | undefined,
    primaryDyeId: number,
    secondaryDyeId: number,
    accentDyeId: number,
  ]
>

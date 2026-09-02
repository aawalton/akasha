declare function GetJournalQuestInfo(
  this: void,
  journalQuestIndex?: number
): LuaMultiReturn<
  [
    questName: string,
    backgroundText: string,
    activeStepText: string,
    activeStepType: number,
    activeStepTrackerOverrideText: string,
    completed: boolean,
    tracked: boolean,
    questLevel: number,
    pushed: boolean,
    questType: number,
    zoneDisplayType: ZoneDisplayType,
  ]
>
declare function GetJournalQuestIsComplete(this: void, journalQuestIndex?: number): boolean
declare function GetJournalQuestName(this: void, journalQuestIndex?: number): string
declare function GetJournalQuestLevel(this: void, journalQuestIndex?: number): number
declare function GetJournalQuestConditionInfo(
  this: void,
  journalQuestIndex?: number,
  stepIndex?: number,
  conditionIndex?: number,
  useShortDescription?: boolean
): LuaMultiReturn<
  [
    conditionText: string,
    current: number,
    max: number,
    isFailCondition: boolean,
    isComplete: boolean,
    isCreditShared: boolean,
    isVisible: boolean,
    conditionType: QuestConditionType,
  ]
>
declare function GetJournalQuestConditionValues(
  this: void,
  journalQuestIndex?: number,
  stepIndex?: number,
  conditionIndex?: number
): LuaMultiReturn<
  [
    current: number,
    max: number,
    isFailCondition: boolean,
    isComplete: boolean,
    isCreditShared: boolean,
    isVisible: boolean,
  ]
>
declare function DoesItemFulfillJournalQuestCondition(
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  journalQuestIndex?: number,
  stepIndex?: number,
  conditionIndex?: number
): boolean
declare function DoesItemLinkFulfillJournalQuestCondition(
  this: void,
  link?: string,
  journalQuestIndex?: number,
  stepIndex?: number,
  conditionIndex?: number,
  isSelfCrafted?: boolean | undefined
): boolean
declare function CanQuickslotQuestItemById(this: void, questItemId?: number): boolean
declare function IsJournalQuestStepEnding(
  this: void,
  journalQuestIndex?: number,
  stepIndex?: number
): boolean
declare function SetMapToQuestCondition(
  this: void,
  journalQuestIndex?: number,
  stepIndex?: number,
  conditionIndex?: number
): SetMapResultCode
declare function SetMapToQuestStepEnding(
  this: void,
  journalQuestIndex?: number,
  stepIndex?: number
): SetMapResultCode
declare function SetMapToQuestZone(this: void, questIndex?: number): SetMapResultCode
declare function GetJournalQuestNumRewards(this: void, journalQuestIndex?: number): number
declare function GetQuestRewardItemLink(
  this: void,
  rewardIndex?: number,
  linkStyle?: number
): string
declare function GetNextCompletedQuestId(
  this: void,
  lastQuestId?: number | undefined
): number | undefined
declare function GetCompletedQuestInfo(
  this: void,
  questId?: number
): LuaMultiReturn<[name: string, questType: QuestType]>
declare function GetCompletedQuestLocationInfo(
  this: void,
  questId?: number
): LuaMultiReturn<[zoneName: string, objectiveName: string, zoneIndex: number, poiIndex: number]>
declare function GetJournalQuestRewardInfo(
  this: void,
  journalQuestIndex?: number,
  rewardIndex?: number
): LuaMultiReturn<
  [
    type: RewardType,
    name: string,
    amount: number,
    iconFile: string,
    meetsUsageRequirement: boolean,
    itemDisplayQuality: ItemDisplayQuality,
    itemType: RewardItemType | undefined,
  ]
>
declare function GetQuestToolInfo(
  this: void,
  journalQuestIndex?: number,
  toolIndex?: number
): LuaMultiReturn<
  [iconFilename: string, stackCount: number, isUsable: boolean, name: string, questItemId: number]
>
declare function GetQuestItemTooltipText(this: void, questItemId?: number): string
declare function GetQuestItemIcon(this: void, questItemId?: number): string
declare function HasQuest(this: void, questId?: number): boolean
declare function HasCompletedQuest(this: void, questId?: number): boolean
declare function GetQuestType(this: void, questId?: number): QuestType
declare function GetQuestRepeatableType(this: void, questId?: number): QuestRepeatableType
declare function GetQuestConditionItemInfo(
  this: void,
  journalQuestIndex?: number,
  stepIndex?: number,
  conditionIndex?: number
): LuaMultiReturn<
  [itemId: number, materialItemId: number, craftingType: TradeskillType, itemQuality: ItemQuality]
>
declare function GetQuestConditionMasterWritInfo(
  this: void,
  journalQuestIndex?: number,
  stepIndex?: number,
  conditionIndex?: number
): LuaMultiReturn<
  [
    itemId: number | undefined,
    materialItemId: number | undefined,
    craftingType: TradeskillType | undefined,
    itemQuality: ItemQuality | undefined,
    itemTemplateId: number | undefined,
    itemSetId: number | undefined,
    itemTraitType: ItemTraitType | undefined,
    itemStyleId: number | undefined,
    encodedAlchemyTraits: number | undefined,
  ]
>
declare function GetDynamicChatChannelName(this: void, channelId?: number): string
declare function GetNumChatContainerTabs(this: void, chatContainerIndex?: number): number
declare function GetNumChatCategories(this: void): number
declare function IsChatContainerTabCategoryEnabled(
  this: void,
  chatContainerIndex?: number,
  tabIndex?: number,
  chatCategory?: ChatChannelCategories
): boolean
declare const SetChatContainerTabCategoryEnabled: (
  this: void,
  chatContainerIndex?: number,
  tabIndex?: number,
  chatCategory?: ChatChannelCategories,
  enabled?: boolean
) => void
declare function GetChatFontSize(this: void): number
declare const SetChatFontSize: (this: void, fontSize?: number) => void
declare function GetChatCategoryColor(
  this: void,
  category?: ChatChannelCategories
): LuaMultiReturn<[red: number, green: number, blue: number]>
declare const SetChatCategoryColor: (
  this: void,
  category?: ChatChannelCategories,
  red?: number,
  green?: number,
  blue?: number
) => void
declare function GetChannelCategoryFromChannel(
  this: void,
  channel?: ChannelType
): ChatChannelCategories
declare function IsChatSystemAvailableForCurrentPlatform(this: void): boolean
declare function IsChannelCategoryCommunicationRestricted(
  this: void,
  channelCategory?: ChatChannelCategories
): boolean
declare function IsUnderArrest(this: void): boolean
declare function GetChatterOption(
  this: void,
  optionIndex?: number
): LuaMultiReturn<
  [
    optionString: string,
    optionType: number,
    optionalArgument: number,
    isImportant: boolean,
    chosenBefore: boolean,
    teleportNPC: number,
    dialogueTone: DialogueToneType,
  ]
>
declare const SelectChatterOption: (this: void, optionIndex?: number) => void
declare const EndPendingInteraction: (this: void) => void
declare function GetChatterOptionCount(this: void): number
declare function IsInteractingWithMyAssistant(this: void): boolean
declare function IsInteractingWithMyCompanion(this: void): boolean
declare function CheckInventorySpaceAndWarn(this: void, numItems?: number): boolean
declare function CheckInventorySpaceSilently(this: void, numItems?: number): boolean
declare function GetItemTraitInformation(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): ItemTraitInformation
declare function GetItemTraitInformationFromItemLink(
  this: void,
  itemLink?: string
): ItemTraitInformation
declare const RequestEquipItem: (
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  wornBagId?: Bag,
  equipSlot?: EquipSlot
) => void
declare const RequestUnequipItem: (this: void, wornBagId?: Bag, equipSlot?: EquipSlot) => void
declare function GetNumTradingHouseGuilds(this: void): number
declare function GetTradingHouseGuildDetails(
  this: void,
  index?: number
): LuaMultiReturn<[guildId: number, guildName: string, guildAlliance: Alliance]>
declare function GetCurrentTradingHouseGuildDetails(
  this: void
): LuaMultiReturn<[guildId: number, guildName: string, guildAlliance: Alliance]>
declare function CanSellOnTradingHouse(this: void, guildId?: number): boolean
declare function GetSelectedTradingHouseGuildId(this: void): number | undefined
declare function SelectTradingHouseGuildId(this: void, guildId?: number): boolean
declare function GetTradingHouseListingCounts(
  this: void
): LuaMultiReturn<[currentListingCount: number, maxListingCount: number]>
declare function GetTradingHousePostPriceInfo(
  this: void,
  desiredPostPrice?: number
): LuaMultiReturn<[listingFee: number, tradingHouseCut: number, expectedProfit: number]>
declare const SetPendingItemPost: (this: void, bag?: Bag, slot?: number, quantity?: number) => void
declare function GetPendingItemPost(
  this: void
): LuaMultiReturn<[bag: Bag, slot: number, quantity: number]>
declare const RequestPostItemOnTradingHouse: (
  this: void,
  bag?: Bag,
  slot?: number,
  quantity?: number,
  postingPrice?: number
) => void
declare const ClearAllTradingHouseSearchTerms: (this: void) => void
declare function SetTradingHouseFilter(
  this: void,
  filterType?: TradingHouseFilterType,
  values?: number | undefined
): boolean
declare function SetTradingHouseFilterRange(
  this: void,
  filterType?: TradingHouseFilterType,
  minValue?: number | undefined,
  maxValue?: number | undefined
): boolean
declare const ExecuteTradingHouseSearch: (
  this: void,
  page?: number,
  sortField?: TradingHouseSortField,
  sortAscending?: boolean,
  useLastExecutedSearchFilters?: boolean
) => void
declare function GetTradingHouseSearchResultsInfo(
  this: void
): LuaMultiReturn<[numItemsOnPage: number, currentPage: number, hasMorePages: boolean]>
declare function GetTradingHouseSearchResultItemInfo(
  this: void,
  index?: number
): LuaMultiReturn<
  [
    icon: string,
    itemName: string,
    displayQuality: ItemDisplayQuality,
    stackCount: number,
    sellerName: string,
    timeRemaining: number,
    purchasePrice: number,
    currencyType: CurrencyType,
    itemUniqueId: Id64,
    purchasePricePerUnit: number,
  ]
>
declare function GetTradingHouseSearchResultItemLink(
  this: void,
  index?: number,
  linkStyle?: number
): string
declare const RequestTradingHouseListings: (this: void) => void
declare function GetNumTradingHouseListings(this: void): number
declare const CancelTradingHouseListing: (this: void, index?: number) => void
declare function GetTradingHouseListingItemInfo(
  this: void,
  index?: number
): LuaMultiReturn<
  [
    icon: string,
    itemName: string,
    displayQuality: ItemDisplayQuality,
    stackCount: number,
    sellerName: string,
    timeRemaining: number,
    salePrice: number,
    currencyType: CurrencyType,
    itemUniqueId: Id64,
    salePricePerUnit: number,
  ]
>
declare function GetTradingHouseListingItemLink(
  this: void,
  index?: number,
  linkStyle?: number
): string
declare function GetTradingHouseCooldownRemaining(this: void): number
declare function GetNumZones(this: void): number
declare function SetMapToPlayerLocation(this: void): SetMapResultCode
declare function DoesCurrentMapMatchMapForPlayerLocation(this: void): boolean
declare function DoesCurrentMapShowPlayerWorld(this: void): boolean
declare function SetMapToMapListIndex(this: void, index?: number): SetMapResultCode
declare function SetMapToMapId(this: void, mapId?: number): SetMapResultCode
declare function SetMapToAutoMapNavigationTargetPosition(this: void): SetMapResultCode
declare function GetCurrentMapIndex(this: void): number | undefined
declare function GetCurrentMapId(this: void): number
declare function GetMapIndexByZoneId(this: void, zoneId?: number): number | undefined
declare function GetMapIdByZoneId(this: void, zoneId?: number): number
declare function GetMapIdByIndex(this: void, mapIndex?: number): number
declare function GetCyrodiilMapIndex(this: void): number | undefined
declare function GetImperialCityMapIndex(this: void): number | undefined
declare function GetCurrentMapZoneIndex(this: void): number
declare function GetZoneNameByIndex(this: void, zoneIndex?: number): string
declare function GetMapNameByIndex(this: void, mapIndex?: number): string
declare function GetMapNameById(this: void, mapId?: number): string
declare function GetNumMaps(this: void): number
declare function MapZoomOut(this: void): SetMapResultCode
declare function WouldProcessMapClick(
  this: void,
  normalizedClickX?: number,
  normalizedClickY?: number
): LuaMultiReturn<[wouldProcess: boolean, resultingMapIndex: number | undefined]>
declare function ProcessMapClick(
  this: void,
  normalizedClickX?: number,
  normalizedClickY?: number
): SetMapResultCode
declare function GetMapInfoById(
  this: void,
  mapId?: number
): LuaMultiReturn<
  [
    name: string,
    mapType: UIMapType,
    mapContentType: MapContentType,
    zoneIndex: number,
    description: string,
  ]
>
declare function GetUniversallyNormalizedMapInfo(
  this: void,
  mapId?: number
): LuaMultiReturn<
  [
    normalizedOffsetX: number,
    normalizedOffsetZ: number,
    normalizedWidth: number,
    normalizedHeight: number,
  ]
>
declare function GetZoneDescriptionById(this: void, zoneId?: number): string
declare function GetMapNumTiles(
  this: void
): LuaMultiReturn<[numHorizontalTiles: number, numVerticalTiles: number]>
declare function GetMapTileTexture(this: void, tileIndex?: number): string
declare function GetMapTileTextureForMapId(this: void, mapId?: number, tileIndex?: number): string
declare function GetMapName(this: void): string
declare function GetMapType(this: void): UIMapType
declare function GetMapContentType(this: void): MapContentType
declare function GetMapCustomMaxZoom(this: void): number | undefined
declare function GetMapFilterType(this: void): MapFilterType
declare function GetNumMapLocations(this: void): number
declare function IsMapLocationVisible(this: void, locationIndex?: number): boolean
declare function GetMapFloorInfo(
  this: void
): LuaMultiReturn<[currentFloor: number, numFloors: number]>
declare function SetMapFloor(this: void, desiredFloorIndex?: number): SetMapResultCode
declare function ShouldMapShowPriorityFastTravelOnly(this: void): boolean

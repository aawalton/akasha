// Generated from the ~/esoui clone by ops eso generate-typings
// ESO-API-Version: 101050  (source freshness marker; verified by check-eso-typings-fresh)
// ESO Game API Functions (Auto-generated — opt-in scoped)
// Generated from ESOUIDocumentation.txt by ops eso generate-typings.
// Do not edit by hand; add tokens to the manifest and regenerate.

// Id64 type for 64-bit identifiers
type Id64 = string & { readonly __brand: "Id64" }

declare function ReloadUI(this: void, guiName?: string): void

declare function GetCVar(this: void, CVarName?: string): string

declare function SetCVar(this: void, CVarName?: string, value?: string): void

declare function GetString(this: void, stringVariablePrefix?: string, contextId?: number): string

declare function IsShiftKeyDown(this: void): boolean

declare function IsControlKeyDown(this: void): boolean

declare function IsAltKeyDown(this: void): boolean

declare function IsCommandKeyDown(this: void): boolean

declare function PlaySound(this: void, soundName?: string): void

declare function GetInterfaceColor(
  this: void,
  interfaceColorType?: InterfaceColorType,
  fieldValue?: number
): LuaMultiReturn<[red: number, green: number, blue: number, alpha: number]>

declare function GetErrorString(this: void, errorStringId?: number): string

declare function GetAllianceName(this: void, alliance?: Alliance): string

declare function GetNumClasses(this: void): number

declare function GetClassIdByIndex(this: void, index?: number): number

declare function GetClassIndexById(this: void, classId?: number): number | undefined

declare function GetClassInfo(
  this: void,
  index?: number
): LuaMultiReturn<
  [
    classId: number,
    lore: string,
    normalIconKeyboard: string,
    pressedIconKeyboard: string,
    mouseoverIconKeyboard: string,
    isSelectable: boolean,
    ingameIconKeyboard: string,
    ingameIconGamepad: string,
    normalIconGamepad: string,
    pressedIconGamepad: string,
  ]
>

declare function GetClassName(this: void, gender?: Gender, classId?: number): string

declare function GetRaceName(this: void, gender?: Gender, raceId?: number): string

declare function SplitString(
  this: void,
  delims?: string,
  stringToSplit?: string
): LuaMultiReturn<[strings: string, ...rest: string[]]>

declare function LocaleAwareToUpper(this: void, stringToUppercase?: string): string

declare function LocaleAwareToLower(this: void, stringToLowercase?: string): string

declare function IsMinSpecMachine(this: void): boolean

declare function IsPrivateFunction(this: void, functionName?: string): boolean

declare function IsProtectedFunction(this: void, functionName?: string): boolean

declare function GetAPIVersion(this: void): number

declare function Id64ToString(this: void, id?: Id64): string

declare function StringToId64(this: void, stringId?: string): Id64

declare function AreId64sEqual(this: void, firstId?: Id64, secondId?: Id64): boolean

declare function Id64ToNumber(
  this: void,
  id?: Id64
): LuaMultiReturn<[number: number, lostPrecisionUseId64ToString: boolean]>

declare function NumberToId64(
  this: void,
  number?: number
): LuaMultiReturn<[id: Id64, lostPrecisionUseStringToId64: boolean]>

declare function BitAnd(this: void, valueA?: number, valueB?: number): number

declare function BitOr(this: void, valueA?: number, valueB?: number): number

declare function BitLShift(this: void, value?: number, numBits?: number): number

declare function BitRShift(this: void, value?: number, numBits?: number): number

declare function GetFrameTimeSeconds(this: void): number

declare function GetFrameDeltaTimeSeconds(this: void): number

declare function GetDateStringFromTimestamp(this: void, timestamp?: number): string

declare function GetGameTimeMilliseconds(this: void): number

declare function GetGameTimeSeconds(this: void): number

declare function GetFramerate(this: void): number

declare function GetDiffBetweenTimeStamps(
  this: void,
  laterTime?: number,
  earlierTime?: number
): number

declare function FormatTimeSeconds(
  this: void,
  timeValueInSeconds?: number,
  formatType?: TimeFormatStyleCode,
  precisionType?: TimeFormatPrecisionCode,
  direction?: TimeFormatDirectionCode
): LuaMultiReturn<[formattedTimeString: string, nextUpdateTimeInSec: number]>

declare function SetGameCameraUIMode(this: void, active?: boolean): void

declare function SetCameraOptionsPreviewModeEnabled(
  this: void,
  enabled?: boolean,
  option?: CameraOptionsPreview
): void

declare function GetGamepadIconPathForKeyCode(
  this: void,
  key?: KeyCode,
  disabled?: boolean
): LuaMultiReturn<
  [gamepadIcon: string | undefined, width: number | undefined, height: number | undefined]
>

declare function GetMouseIconPathForKeyCode(
  this: void,
  key?: KeyCode
): LuaMultiReturn<
  [mouseIcon: string | undefined, width: number | undefined, height: number | undefined]
>

declare function HashString(this: void, text?: string): number

declare function GetESOVersionString(this: void): string

declare function TakeScreenshot(this: void): void

declare function GetStringWidthScaled(
  this: void,
  fontObject?: unknown,
  text?: string,
  scale?: number,
  space?: Space
): number

declare function ZoGetOfficialGameLanguageDescriptor(this: void): string

declare function GetTotalUserAddOnCPUTimeUsedNowMS(this: void): number

declare function GetTotalUserAddOnCPUTimeAvailableEachFrameMS(this: void): number

declare function SetSetting(
  this: void,
  system?: SettingSystemType,
  settingId?: number,
  value?: string,
  setOptions?: SetOptions
): void

declare function ApplySettings(this: void): void

declare function GetSetting(this: void, system?: SettingSystemType, settingId?: number): string

declare function GetSetting_Bool(
  this: void,
  system?: SettingSystemType,
  settingId?: number
): boolean

declare function GetPlatformServiceType(this: void): PlatformServiceType

declare function GetSecondsSinceMidnight(this: void): number

declare function GetFrameTimeMilliseconds(this: void): number

declare function GetTimeStamp(this: void): number

declare function GetDate(this: void): number

declare function GetTimeString(this: void): string

declare function GetDateElementsFromTimestamp(
  this: void,
  timestamp?: number
): LuaMultiReturn<[year: number, month: number, day: number]>

declare function GetTimestampForStartOfDate(
  this: void,
  year?: number,
  month?: number,
  day?: number,
  inLocalTime?: boolean
): number

declare function GetFormattedTime(this: void): number

declare function GetDisplayName(this: void): string

declare function DecorateDisplayName(this: void, displayName?: string): string

declare function IsDecoratedDisplayName(this: void, displayName?: string): boolean

declare function UndecorateDisplayName(this: void, displayName?: string): string

declare function GetNumFriends(this: void): number

declare function GetFriendInfo(
  this: void,
  friendIndex?: number
): LuaMultiReturn<
  [displayName: string, note: string, playerStatus: PlayerStatus, secsSinceLogoff: number]
>

declare function GetFriendCharacterInfo(
  this: void,
  friendIndex?: number
): LuaMultiReturn<
  [
    hasCharacter: boolean,
    characterName: string,
    zoneName: string,
    classType: number,
    alliance: Alliance,
    level: number,
    championRank: number,
    zoneId: number,
    consoleId: Id64,
  ]
>

declare function IsIgnored(this: void, charOrDisplayName?: string): boolean

declare function AddIgnore(this: void, charOrDisplayName?: string): void

declare function IsFriend(this: void, charOrDisplayName?: string): boolean

declare function GetGuildId(this: void, guildIndex?: number): number

declare function GetNumGuilds(this: void): number

declare function GetGuildName(this: void, guildId?: number): string

declare function GetGuildMotD(this: void, guildId?: number): string

declare function GetGuildAlliance(this: void, guildId?: number): Alliance

declare function GetNumGuildMembers(this: void, guildId?: number): number

declare function GetGuildMemberInfo(
  this: void,
  guildId?: number,
  memberIndex?: number
): LuaMultiReturn<
  [
    name: string,
    note: string,
    rankIndex: number,
    playerStatus: PlayerStatus,
    secsSinceLogoff: number,
  ]
>

declare function GetGuildMemberCharacterInfo(
  this: void,
  guildId?: number,
  memberIndex?: number
): LuaMultiReturn<
  [
    hasCharacter: boolean,
    characterName: string,
    zoneName: string,
    classType: number,
    alliance: Alliance,
    level: number,
    championRank: number,
    zoneId: number,
    consoleId: Id64,
  ]
>

declare function GetGuildMemberIndexFromDisplayName(
  this: void,
  guildId?: number,
  displayName?: string
): number | undefined

declare function GetPlayerGuildMemberIndex(this: void, guildId?: number): number

declare function DoesPlayerHaveGuildPermission(
  this: void,
  guildId?: number,
  permission?: GuildPermission
): boolean

declare function DoesGuildHavePrivilege(
  this: void,
  guildId?: number,
  privilege?: GuildPrivilege
): boolean

declare function GetNumGuildInvites(this: void): number

declare function GetGuildInviteInfo(
  this: void,
  index?: number
): LuaMultiReturn<
  [
    guildId: number,
    guildName: string,
    guildAlliance: Alliance,
    inviterDisplayName: string,
    note: string,
  ]
>

declare function AcceptGuildInvite(this: void, guildId?: number): void

declare function RejectGuildInvite(this: void, guildId?: number): void

declare function JumpToGuildMember(this: void, name?: string): void

declare function GetGuildOwnedKioskInfo(this: void, guildId?: number): string | undefined

declare function GetGuildKioskCycleTimes(
  this: void
): LuaMultiReturn<[despawnTimestampS: number, bidEndTimestampS: number, respawnTimestampS: number]>

declare function GetMostRecentGamepadType(this: void): GamepadType

declare function GetKeyboardIconPathForKeyCode(
  this: void,
  key?: KeyCode,
  disabled?: boolean
): LuaMultiReturn<
  [keyboardIcon: string | undefined, width: number | undefined, height: number | undefined]
>

declare function IsConsoleUI(this: void): boolean

declare function IsMacUI(this: void): boolean

declare function IsKeyboardUISupported(this: void): boolean

declare function IsInGamepadPreferredMode(this: void): boolean

declare function IsKeyCodeGamepadKey(this: void, key?: KeyCode): boolean

declare function GetUIPlatform(this: void): UIPlatform

declare function GetKeyboardLayout(this: void): string

declare function IsCountSingularForm(this: void, number?: number): boolean

declare function FormatFloatRelevantFraction(this: void, num?: number): string

declare function IsESOPlusSubscriber(this: void): boolean

declare function GetTrialInfo(
  this: void
): LuaMultiReturn<[accountTypeId: number, title: string, description: string, version: number]>

declare function GetCollectibleName(this: void, collectibleId?: number): string

declare function GetCollectibleCategoryNameByCollectibleId(
  this: void,
  collectibleId?: number
): string

declare function RequestReadPendingNarrationTextToClient(
  this: void,
  narrationType?: ScreenReaderNarrationType
): void

declare function ClearActiveNarration(this: void): void

declare function GetCriticalStrikeChance(this: void, statValue?: number): number

declare function IsPlayerActivated(this: void): boolean

declare function GetLatency(this: void): number

declare function DoesUnitExist(this: void, unitTag?: string): boolean

declare function GetRawUnitName(this: void, unitTag?: string): string

declare function GetUnitDisplayName(this: void, unitTag?: string): string

declare function GetUnitGender(this: void, unitTag?: string): Gender

declare function GetUnitNameHighlightedByReticle(this: void): string

declare function GetUnitClassId(this: void, unitTag?: string): number

declare function GetUnitChampionPoints(this: void, unitTag?: string): number

declare function GetUnitEffectiveChampionPoints(this: void, unitTag?: string): number

declare function GetUnitZone(this: void, unitTag?: string): string

declare function GetUnitWorldPosition(
  this: void,
  unitTag?: string
): LuaMultiReturn<[zoneId: number, worldX: number, worldY: number, worldZ: number]>

declare function GetUnitRawWorldPosition(
  this: void,
  unitTag?: string
): LuaMultiReturn<[zoneId: number, worldX: number, worldY: number, worldZ: number]>

declare function IsUnitUsingVeteranDifficulty(this: void, unitTag?: string): boolean

declare function GetPlayerCurseType(this: void): CurseType

declare function GetPlayerChampionPointsEarned(this: void): number

declare function AreUnitsEqual(this: void, unitTag?: string, secondUnitTag?: string): boolean

declare function IsUnitGrouped(this: void, unitTag?: string): boolean

declare function IsUnitGroupLeader(this: void, unitTag?: string): boolean

declare function GetGroupLeaderUnitTag(this: void): string

declare function IsUnitPlayer(this: void, unitTag?: string): boolean

declare function GetUnitAlliance(this: void, unitTag?: string): number

declare function GetUnitRaceId(this: void, unitTag?: string): number

declare function GetUnitAvARank(
  this: void,
  unitTag?: string
): LuaMultiReturn<[rank: number, subRank: number]>

declare function IsUnitInCombat(this: void, unitTag?: string): boolean

declare function IsUnitDead(this: void, unitTag?: string): boolean

declare function IsUnitDeadOrReincarnating(this: void, unitTag?: string): boolean

declare function IsUnitSwimming(this: void, unitTag?: string): boolean

declare function GetUnitStealthState(this: void, unitTag?: string): number

declare function IsUnitInDungeon(this: void, unitTag?: string): boolean

declare function IsUnitGuildKiosk(this: void, unitTag?: string): boolean

declare function GetUnitPower(
  this: void,
  unitTag?: string,
  powerType?: CombatMechanicFlags
): LuaMultiReturn<[current: number, max: number, effectiveMax: number]>

declare function GetCurrentCharacterId(this: void): string

declare function GetPlayerStat(
  this: void,
  derivedStat?: DerivedStats,
  statBonusOption?: StatBonusOption
): number

declare function CancelCast(this: void): boolean

declare function GetPlayerCameraHeading(this: void): number

declare function GetPlayerWorldPositionInHouse(
  this: void
): LuaMultiReturn<[worldX: number, worldY: number, worldZ: number, rotationRadians: number]>

declare function GetUnitBuffInfo(
  this: void,
  unitTag?: string,
  buffIndex?: number
): LuaMultiReturn<
  [
    buffName: string,
    timeStarted: number,
    timeEnding: number,
    buffSlot: number,
    stackCount: number,
    iconFilename: string,
    deprecatedBuffType: string,
    effectType: BuffEffectType,
    abilityType: AbilityType,
    statusEffectType: StatusEffectType,
    abilityId: number,
    canClickOff: boolean,
    castByPlayer: boolean,
  ]
>

declare function GetNumBuffs(this: void, unitTag?: string): number

declare function GetSlotTexture(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory | undefined
): LuaMultiReturn<[texture: string, weapontexture: string, activationAnimation: string]>

declare function GetSlotName(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory | undefined
): string

declare function GetSlotCooldownInfo(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory | undefined
): LuaMultiReturn<
  [remain: number, duration: number, global: boolean, globalSlotType: ActionBarSlotType]
>

declare function GetSlotItemSound(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory
): number

declare function IsValidItemForSlot(
  this: void,
  bagId?: Bag,
  bagSlotIndex?: number,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory
): boolean

declare function CompleteQuest(this: void): void

declare function AbandonQuest(this: void, journalQuestIndex?: number): void

declare function ShareQuest(this: void, journalQuestIndex?: number): void

declare function GetJournalQuestStepInfo(
  this: void,
  journalQuestIndex?: number,
  stepIndex?: number
): LuaMultiReturn<
  [
    journalText: string,
    visibility: QuestStepVisibility | undefined,
    comparisonType: QuestStepComparisonType,
    trackerOverrideText: string,
    numConditions: number,
  ]
>

declare function GetJournalQuestLocationInfo(
  this: void,
  journalQuestIndex?: number
): LuaMultiReturn<[zoneName: string, objectiveName: string, zoneIndex: number, poiIndex: number]>

declare function GetJournalQuestNumConditions(
  this: void,
  journalQuestIndex?: number,
  stepIndex?: number
): number

declare function GetJournalQuestNumSteps(this: void, journalQuestIndex?: number): number

declare function GetQuestToolCount(this: void, journalQuestIndex?: number): number

declare function EndInteraction(this: void, interactionType?: number): void

declare function GetItemInstanceId(this: void, bagId?: Bag, slotIndex?: number): number | undefined

declare function GetItemTotalCount(this: void, bagId?: Bag, slotIndex?: number): number

declare function GetQuestItemNameFromLink(this: void, link?: string): string

declare function GetItemName(this: void, bagId?: Bag, slotIndex?: number): string

declare function IsItemUsable(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[usable: boolean, usableOnlyFromActionSlot: boolean]>

declare function GetSlotStackSize(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[stack: number, maxStack: number]>

declare function GetEquippedItemInfo(
  this: void,
  equipSlot?: EquipSlot
): LuaMultiReturn<
  [
    icon: string,
    slotHasItem: boolean,
    sellPrice: number,
    isHeldSlot: boolean,
    isHeldNow: boolean,
    locked: boolean,
  ]
>

declare function IsEquipable(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[isEquipable: boolean, resultErrorCodeIfFailed: number]>

declare function GetItemLinkInfo(
  this: void,
  itemLink?: string
): LuaMultiReturn<
  [
    icon: string,
    sellPrice: number,
    meetsUsageRequirement: boolean,
    equipType: EquipType,
    itemStyleId: number,
  ]
>

declare function GetSelectedGuildBankId(this: void): number | undefined

declare function GetMapPlayerPosition(
  this: void,
  unitTag?: string
): LuaMultiReturn<
  [
    normalizedX: number,
    normalizedZ: number,
    heading: number,
    isShownInCurrentMap: boolean,
    isSymbolicLocation: boolean,
  ]
>

declare function GetMapPing(
  this: void,
  unitTag?: string
): LuaMultiReturn<[normalizedX: number, normalizedY: number]>

declare function GetMapRallyPoint(
  this: void
): LuaMultiReturn<[normalizedX: number, normalizedY: number]>

declare function GetMapPlayerWaypoint(
  this: void
): LuaMultiReturn<[normalizedX: number, normalizedY: number]>

declare function GetKeepFastTravelInteraction(this: void): number | undefined

declare function GetNumLootItems(this: void): number

declare function GetTrackedIsAssisted(
  this: void,
  trackType?: TrackedDataType,
  param1?: number,
  param2?: number
): boolean

declare function FormatAchievementLinkTimestamp(
  this: void,
  timestamp?: string
): LuaMultiReturn<[date: string, time: string]>

declare function GetAbilityProgressionInfo(
  this: void,
  progressionIndex?: number
): LuaMultiReturn<[name: string, morph: number, rank: number]>

declare function GetAbilityProgressionXPInfo(
  this: void,
  progressionIndex?: number
): LuaMultiReturn<[lastRankXp: number, nextRankXP: number, currentXP: number, atMorph: boolean]>

declare function GetAbilityProgressionAbilityInfo(
  this: void,
  progressionIndex?: number,
  morph?: number,
  rank?: number
): LuaMultiReturn<[name: string, texture: string, abilityIndex: number]>

declare function GetAbilityProgressionRankFromAbilityId(
  this: void,
  abilityId?: number
): number | undefined

declare function GetAbilityProgressionXPInfoFromAbilityId(
  this: void,
  abilityId?: number
): LuaMultiReturn<
  [
    hasProgression: boolean,
    progressionIndex: number,
    lastRankXp: number,
    nextRankXP: number,
    currentXP: number,
    atMorph: boolean,
  ]
>

declare function GetGameCameraInteractableActionInfo(
  this: void
): LuaMultiReturn<
  [
    action: string | undefined,
    name: string | undefined,
    interactBlocked: boolean,
    isOwned: boolean,
    additionalInfo: number,
    contextualInfo: number | undefined,
    contextualLink: string | undefined,
    isCriminalInteract: boolean,
  ]
>

declare function GetAllyUnitBlockState(this: void, unitTag?: string): BlockState

declare function Quit(this: void): void

declare function CancelLogout(this: void): void

declare function GetIsNewCharacter(this: void): boolean

declare function GetWorldName(this: void): string

declare function GetPlayerStatus(this: void): PlayerStatus

declare function SelectPlayerStatus(this: void, status?: PlayerStatus): void

declare function GetCursorBagId(this: void): Bag | undefined

declare function GetCursorSlotIndex(this: void): number | undefined

declare function GetNumActionLayers(this: void): number

declare function GetActionLayerInfo(
  this: void,
  layerIndex?: number
): LuaMultiReturn<[layerName: string, numLayerCategories: number]>

declare function GetActionLayerCategoryInfo(
  this: void,
  layerIndex?: number,
  categoryIndex?: number
): LuaMultiReturn<[categoryName: string, numActions: number]>

declare function GetActionInfo(
  this: void,
  layerIndex?: number,
  categoryIndex?: number,
  actionIndex?: number
): LuaMultiReturn<[actionName: string, isRebindable: boolean, isHidden: boolean]>

declare function GetActionBindingInfo(
  this: void,
  layerIndex?: number,
  categoryIndex?: number,
  actionIndex?: number,
  bindingIndex?: number
): LuaMultiReturn<[keyCode: KeyCode, mod1: KeyCode, mod2: KeyCode, mod3: KeyCode, mod4: KeyCode]>

declare function GetHighestPriorityActionBindingInfoFromName(
  this: void,
  actionName?: string,
  preferGamepad?: boolean
): LuaMultiReturn<[keyCode: KeyCode, mod1: KeyCode, mod2: KeyCode, mod3: KeyCode, mod4: KeyCode]>

declare function GetMaxBindingsPerAction(this: void): number

declare function GetActionIndicesFromName(
  this: void,
  actionName?: string
): LuaMultiReturn<
  [
    layerIndex: number | undefined,
    categoryIndex: number | undefined,
    actionIndex: number | undefined,
  ]
>

declare function PushActionLayerByName(this: void, layerName?: string): void

declare function RemoveActionLayerByName(this: void, layerName?: string): void

declare function GetNumCharacters(this: void): number

declare function GetCharacterInfo(
  this: void,
  index?: number
): LuaMultiReturn<
  [
    name: string,
    gender: Gender,
    level: number,
    classId: number,
    raceId: number,
    alliance: Alliance,
    id: string,
    locationId: number,
  ]
>

declare function GetAdvancedStatValue(
  this: void,
  statType?: AdvancedStatDisplayType
): LuaMultiReturn<
  [
    displayFormat: AdvancedStatDisplayFormat,
    flatValue: number | undefined,
    percentValue: number | undefined,
  ]
>

declare function GetCon(
  this: void,
  otherLevel?: number,
  playerLevel?: number | undefined
): DifficultyCon

declare function CastGroupVote(this: void, vote?: GroupVoteChoice): void

declare function GroupLeave(this: void): void

declare function GroupInviteByName(this: void, characterOrDisplayName?: string): void

declare function GroupDisband(this: void): void

declare function IsPlayerInGroup(this: void, characterOrDisplayName?: string): boolean

declare function GetGroupSize(this: void): number

declare function JumpToGroupLeader(this: void): void

declare function JumpToGroupMember(this: void, characterOrDisplayName?: string): void

declare function GetGroupUnitTagByIndex(this: void, sortIndex?: number): string | undefined

declare function GetGroupIndexByUnitTag(this: void, unitTag?: string): number

declare function IsAnyGroupMemberInDungeon(this: void): boolean

declare function GetGroupMemberSelectedRole(this: void, unitTag?: string): LFGRole

declare function IsGroupModificationAvailable(this: void): boolean

declare function GetGroupElectionInfo(
  this: void
): LuaMultiReturn<
  [
    electionType: GroupElectionType,
    timeRemainingSeconds: number,
    electionDescriptor: string,
    targetUnitTag: string | undefined,
  ]
>

declare function IsRaidInProgress(this: void): boolean

declare function IsPlayerInRaid(this: void): boolean

declare function GetRaidName(this: void, raidId?: number): string

declare function GetCurrentParticipatingRaidId(this: void): number

declare function GetNumStacksForEndlessDungeonBuff(
  this: void,
  buffAbilityId?: number,
  includeLifetimeStacks?: boolean
): number

declare function JumpToFriend(this: void, displayName?: string): void

declare function JumpToHouse(this: void, displayName?: string): void

declare function JumpToSpecificHouse(
  this: void,
  displayName?: string,
  houseId?: number,
  fromHouseTours?: boolean
): void

declare function GetNextLeaderboardScoreNotificationId(
  this: void,
  lastId?: number | undefined
): number | undefined

declare function GetLeaderboardScoreNotificationInfo(
  this: void,
  notificationId?: number
): LuaMultiReturn<
  [
    contentType: LeaderboardScoreNotificationType,
    contentId: number,
    contentContextualInfo: number,
    score: number,
    millisecondsSinceRequest: number,
    numMembers: number,
  ]
>

declare function GetLeaderboardScoreNotificationMemberInfo(
  this: void,
  notificationId?: number,
  memberIndex?: number
): LuaMultiReturn<
  [
    displayName: string,
    characterName: string,
    isFriend: boolean,
    isGuildMember: boolean,
    isPlayer: boolean,
  ]
>

declare function RemoveLeaderboardScoreNotification(this: void, notificationId?: number): void

declare function IsCommunicationRestricted(this: void): boolean

declare function CanCommunicateWith(
  this: void,
  characterOrDisplayName?: string,
  consoleId?: Id64
): boolean

declare function GetSlotItemLink(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory
): string

declare function GetSlotBoundId(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory | undefined
): number

declare function GetSlotType(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory | undefined
): ActionBarSlotType

declare function GetCurrentQuickslot(this: void): number

declare function SetCurrentQuickslot(this: void, actionSlotIndex?: number): void

declare function GetActiveHotbarCategory(this: void): HotBarCategory

declare function GetActionSlotEffectTimeRemaining(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory | undefined
): number

declare function GetActionSlotEffectStackCount(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory | undefined
): number

declare function IsSlotToggled(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory | undefined
): boolean

declare function GetRidingStats(
  this: void
): LuaMultiReturn<
  [
    inventoryBonus: number,
    maxInventoryBonus: number,
    staminaBonus: number,
    maxStaminaBonus: number,
    speedBonus: number,
    maxSpeedBonus: number,
  ]
>

declare function GetTimeUntilCanBeTrained(
  this: void
): LuaMultiReturn<[timeMs: number, totalDurationMs: number]>

declare function IsMounted(this: void): boolean

declare function GetAbilityEffectDescription(this: void, effectSlotId?: number): string

declare function GetOfferedQuestInfo(
  this: void
): LuaMultiReturn<[dialogue: string, response: string]>

declare function AcceptOfferedQuest(this: void): void

declare function AcceptSharedQuest(this: void, questId?: number): void

declare function GetNumJournalQuests(this: void): number

declare function IsValidQuestIndex(this: void, journalQuestIndex?: number): boolean

declare function GetJournalQuestType(this: void, journalQuestIndex?: number): QuestType

declare function GetJournalQuestRepeatType(
  this: void,
  journalQuestIndex?: number
): QuestRepeatableType

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
  linkStyle?: LinkStyle
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

declare function SetChatContainerTabCategoryEnabled(
  this: void,
  chatContainerIndex?: number,
  tabIndex?: number,
  chatCategory?: ChatChannelCategories,
  enabled?: boolean
): void

declare function GetChatFontSize(this: void): number

declare function SetChatFontSize(this: void, fontSize?: number): void

declare function GetChatCategoryColor(
  this: void,
  category?: ChatChannelCategories
): LuaMultiReturn<[red: number, green: number, blue: number]>

declare function SetChatCategoryColor(
  this: void,
  category?: ChatChannelCategories,
  red?: number,
  green?: number,
  blue?: number
): void

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

declare function SelectChatterOption(this: void, optionIndex?: number): void

declare function EndPendingInteraction(this: void): void

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

declare function RequestEquipItem(
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  wornBagId?: Bag,
  equipSlot?: EquipSlot
): void

declare function RequestUnequipItem(this: void, wornBagId?: Bag, equipSlot?: EquipSlot): void

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

declare function SetPendingItemPost(this: void, bag?: Bag, slot?: number, quantity?: number): void

declare function GetPendingItemPost(
  this: void
): LuaMultiReturn<[bag: Bag, slot: number, quantity: number]>

declare function RequestPostItemOnTradingHouse(
  this: void,
  bag?: Bag,
  slot?: number,
  quantity?: number,
  postingPrice?: number
): void

declare function ClearAllTradingHouseSearchTerms(this: void): void

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

declare function ExecuteTradingHouseSearch(
  this: void,
  page?: number,
  sortField?: TradingHouseSortField,
  sortAscending?: boolean,
  useLastExecutedSearchFilters?: boolean
): void

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
  linkStyle?: LinkStyle
): string

declare function RequestTradingHouseListings(this: void): void

declare function GetNumTradingHouseListings(this: void): number

declare function CancelTradingHouseListing(this: void, index?: number): void

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
  linkStyle?: LinkStyle
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

declare function GetNormalizedWorldPosition(
  this: void,
  zoneId?: number,
  worldX?: number,
  worldY?: number,
  worldZ?: number
): LuaMultiReturn<[normalizedX: number, normalizedY: number]>

declare function PingMap(
  this: void,
  pingType?: MapDisplayPinType,
  mapDisplayType?: MapDisplayType,
  normalizedX?: number,
  normalizedZ?: number,
  mapDisplay?: unknown
): void

declare function SetPlayerWaypointByWorldLocation(
  this: void,
  worldX?: number,
  worldY?: number,
  worldZ?: number
): boolean

declare function RemovePlayerWaypoint(this: void): void

declare function RemoveRallyPoint(this: void): void

declare function GenerateMasterWritBaseText(this: void, itemLink?: string): string

declare function GenerateMasterWritRewardText(this: void, itemLink?: string): string

declare function GetNumPOIs(this: void, zoneIndex?: number): number

declare function GetPOIInfo(
  this: void,
  zoneIndex?: number,
  poiIndex?: number
): LuaMultiReturn<
  [
    objectiveName: string,
    objectiveLevel: number,
    startDescription: string,
    finishedDescription: string,
  ]
>

declare function GetPOIType(this: void, zoneIndex?: number, poiIndex?: number): PointOfInterestType

declare function GetPOIMapInfo(
  this: void,
  zoneIndex?: number,
  poiIndex?: number
): LuaMultiReturn<
  [
    normalizedX: number,
    normalizedZ: number,
    poiPinType: MapDisplayPinType,
    icon: string,
    isShownInCurrentMap: boolean,
    linkedCollectibleIsLocked: boolean,
    isDiscovered: boolean,
    isNearby: boolean,
  ]
>

declare function IsInCyrodiil(this: void): boolean

declare function IsInImperialCity(this: void): boolean

declare function IsInJusticeEnabledZone(this: void): boolean

declare function CanLeaveCurrentLocationViaTeleport(this: void): boolean

declare function GetPOIZoneCompletionType(
  this: void,
  zoneIndex?: number,
  poiIndex?: number
): ZoneCompletionType

declare function GetPOIInstanceType(this: void, zoneIndex?: number, poiIndex?: number): InstanceType

declare function GetCadwellProgressionLevel(this: void): CadwellProgressionLevel

declare function GetNumZonesForCadwellProgressionLevel(
  this: void,
  cadwellProgressionLevel?: CadwellProgressionLevel
): number

declare function GetCadwellZoneInfo(
  this: void,
  cadwellProgressionLevel?: CadwellProgressionLevel,
  zoneIndex?: number
): LuaMultiReturn<[zoneName: string, zoneDescription: string, zoneOrder: number]>

declare function GetNumPOIsForCadwellProgressionLevelAndZone(
  this: void,
  cadwellProgressionLevel?: CadwellProgressionLevel,
  zoneIndex?: number
): number

declare function GetCadwellZonePOIInfo(
  this: void,
  cadwellProgressionLevel?: CadwellProgressionLevel,
  zoneIndex?: number,
  poiIndex?: number
): LuaMultiReturn<
  [
    poiName: string,
    poiOpeningText: string,
    poiClosingText: string,
    poiOrder: number,
    discovered: boolean,
    completed: boolean,
  ]
>

declare function GetPlayerActiveSubzoneName(this: void): string

declare function GetPlayerActiveZoneName(this: void): string

declare function GetPlayerLocationName(this: void): string

declare function IsPlayerInAvAWorld(this: void): boolean

declare function IsActiveWorldBattleground(this: void): boolean

declare function GetNumFastTravelNodes(this: void): number

declare function GetFastTravelNodeInfo(
  this: void,
  nodeIndex?: number
): LuaMultiReturn<
  [
    known: boolean,
    name: string,
    normalizedX: number,
    normalizedY: number,
    icon: string,
    glowIcon: string | undefined,
    poiType: PointOfInterestType,
    isShownInCurrentMap: boolean,
    linkedCollectibleIsLocked: boolean,
  ]
>

declare function GetFastTravelNodePOIIndicies(
  this: void,
  nodeIndex?: number
): LuaMultiReturn<[zoneIndex: number, poiIndex: number]>

declare function GetFastTravelNodeHouseId(this: void, nodeIndex?: number): number

declare function GetFastTravelNodeMapPriority(this: void, nodeIndex?: number): number | undefined

declare function IsFastTravelNodeAutoDiscovered(this: void, nodeIndex?: number): boolean

declare function FastTravelToNode(this: void, nodeIndex?: number): void

declare function GetRecallCost(this: void, nodeIndex?: number): number

declare function GetCurrentBattlegroundId(this: void): number

declare function GetCurrentCampaignId(this: void): number

declare function GetCampaignName(this: void, campaignId?: number): string

declare function GetStoreEntryInfo(
  this: void,
  entryIndex?: number
): LuaMultiReturn<
  [
    icon: string,
    name: string,
    stack: number,
    price: number,
    sellPrice: number,
    meetsRequirementsToBuy: boolean,
    meetsRequirementsToUse: boolean,
    quality: number,
    questNameColor: boolean,
    currencyType1: CurrencyType,
    currencyQuantity1: number,
    currencyType2: CurrencyType,
    currencyQuantity2: number,
    entryType: StoreEntryType,
    buyStoreFailure: StoreFailure,
    buyErrorStringId: number,
    actorCategory: number,
  ]
>

declare function GetNumStoreItems(this: void): number

declare function GetStoreItemLink(this: void, entryIndex?: number, linkStyle?: LinkStyle): string

declare function GetStoreEntryMaxBuyable(this: void, entryIndex?: number): number

declare function GetBuybackItemLink(this: void, entryIndex?: number, linkStyle?: LinkStyle): string

declare function BuyStoreItem(this: void, entryIndex?: number, quantity?: number): void

declare function SellInventoryItem(
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  quantity?: number
): void

declare function SellAllJunk(this: void): void

declare function RepairItem(this: void, bagId?: Bag, slotIndex?: number): void

declare function LaunderItem(this: void, bagId?: Bag, slotIndex?: number, quantity?: number): void

declare function IsStoreEmpty(this: void): boolean

declare function CanStoreRepair(this: void): boolean

declare function LootAll(this: void, ignoreStolenItems?: boolean): void

declare function GetLootItemLink(this: void, lootId?: number, linkStyle?: LinkStyle): string

declare function GetLootItemType(this: void, lootId?: number): LootItemType

declare function LootItemById(this: void, lootId?: number): void

declare function EndLooting(this: void): void

declare function IsLooting(this: void): boolean

declare function GetLootTargetInfo(
  this: void
): LuaMultiReturn<
  [name: string, targetType: InteractTargetType, actionName: string, isOwned: boolean]
>

declare function GetLootItemInfo(
  this: void,
  lootIndex?: number
): LuaMultiReturn<
  [
    lootId: number,
    name: string,
    icon: string,
    count: number,
    quality: number,
    value: number,
    isQuest: boolean,
    stolen: boolean,
    lootType: LootItemType,
    isLockedSetPiece: boolean,
    canBeUsedToLearn: boolean,
  ]
>

declare function GetLootCurrency(
  this: void,
  type?: CurrencyType
): LuaMultiReturn<[unownedCurrency: number, ownedCurrency: number]>

declare function GetKeepName(this: void, keepId?: number): string

declare function GetNumTitles(this: void): number

declare function GetTitle(this: void, titleIndex?: number): string

declare function GetCurrentTitleIndex(this: void): number | undefined

declare function SelectTitle(this: void, titleIndex?: number | undefined): void

declare function Release(this: void): void

declare function TradeAddItem(
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  tradeIndex?: number | undefined
): void

declare function GetTradeItemInfo(
  this: void,
  who?: TradeParticipant,
  tradeIndex?: number
): LuaMultiReturn<
  [
    name: string,
    icon: string,
    stack: number,
    displayQuality: ItemDisplayQuality,
    creatorName: string,
    sellPrice: number,
    meetsUsageRequirement: boolean,
    equipType: EquipType,
    itemStyleId: number,
  ]
>

declare function GetTradeItemBagAndSlot(
  this: void,
  who?: TradeParticipant,
  tradeIndex?: number
): LuaMultiReturn<[bagId: Bag | undefined, slotIndex: number | undefined]>

declare function GetTradeItemLink(
  this: void,
  who?: TradeParticipant,
  tradeIndex?: number,
  linkStyle?: LinkStyle
): string

declare function GetAvailableSkillPoints(this: void): number

declare function GetNumSkyShards(this: void): number

declare function GetNumSkillTypes(this: void): number

declare function GetNumSkillLines(this: void, skillType?: SkillType): number

declare function GetSkillLineId(this: void, skillType?: SkillType, skillLineIndex?: number): number

declare function GetSkillLineDynamicInfo(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number
): LuaMultiReturn<
  [
    rank: number,
    isAdvised: boolean,
    isActive: boolean,
    isDiscovered: boolean,
    isAccountSkill: boolean,
    isInTraining: boolean,
    isClassMastery: boolean,
  ]
>

declare function GetSkillLineXPInfo(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number
): LuaMultiReturn<[lastRankXP: number, nextRankXP: number, currentXP: number]>

declare function GetSkillLineRankXPExtents(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  rank?: number
): LuaMultiReturn<[startXP: number | undefined, nextRankStartXP: number | undefined]>

declare function GetSkillLineOrderingIndex(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number
): number

declare function GetNumSkillAbilities(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number
): number

declare function GetSkillAbilityInfo(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): LuaMultiReturn<
  [
    name: string,
    texture: string,
    earnedRank: number,
    passive: boolean,
    ultimate: boolean,
    purchased: boolean,
    progressionIndex: number | undefined,
    rank: number,
  ]
>

declare function GetSkillAbilityId(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number,
  showUpgrade?: boolean
): number

declare function GetProgressionSkillProgressionIndex(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): number | undefined

declare function GetProgressionSkillProgressionId(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): number

declare function GetProgressionSkillMorphSlotAbilityId(
  this: void,
  progressionId?: number,
  morphSlot?: MorphSlot
): number

declare function GetCraftedAbilitySkillCraftedAbilityId(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): number

declare function GetSpecificSkillAbilityInfo(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number,
  morphChoice?: number,
  rank?: number
): LuaMultiReturn<[abilityId: number, skillLineRankNeeded: number, characterLevelNeeded: number]>

declare function GetSpecificSkillAbilityKeysByAbilityId(
  this: void,
  abilityId?: number
): LuaMultiReturn<
  [
    skillType: SkillType,
    skillLineIndex: number,
    skillIndex: number,
    morphChoice: number,
    rank: number,
  ]
>

declare function GetSkillAbilityUpgradeInfo(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): LuaMultiReturn<[currentUpgradeLevel: number | undefined, maxUpgradeLevel: number | undefined]>

declare function IsSkillAbilityPassive(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): boolean

declare function IsCraftedAbilitySkill(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): boolean

declare function IsSkillAbilityUltimate(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): boolean

declare function IsSkillAbilityAutoGrant(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): boolean

declare function GetSkillAbilityLineRankNeededToUnlock(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): number

declare function GetSkillAbilityCharacterLevelNeededToUnlock(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): number

declare function IsSkillAbilityPurchased(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): boolean

declare function GetSkillAbilityIndicesFromProgressionIndex(
  this: void,
  progressionIndex?: number
): LuaMultiReturn<[skillType: SkillType, skillLineIndex: number, skillIndex: number]>

declare function GetSkillAbilityIndicesFromCraftedAbilityId(
  this: void,
  craftedAbilityId?: number
): LuaMultiReturn<[skillType: SkillType, skillLineIndex: number, skillIndex: number]>

declare function GetSkillLineIndicesFromSkillLineId(
  this: void,
  skillLineId?: number
): LuaMultiReturn<[skillType: SkillType, skillLineIndex: number]>

declare function IsWerewolfSkillLineById(this: void, skillLineId?: number): boolean

declare function GetSkillLineMasteryCollectibleId(this: void, skillLineId?: number): number

declare function GetSubclassingQuestId(this: void): number

declare function BestowSubclassingQuest(this: void): void

declare function HasAccessToSubclassing(this: void): boolean

declare function PrepareSkillPointAllocationRequest(
  this: void,
  allocationMode?: SkillPointAllocationMode,
  respecPaymentType?: RespecPaymentType
): void

declare function AddHotbarSlotChangeToAllocationRequest(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory,
  actionType?: ActionBarSlotType,
  actionId?: number
): void

declare function SendSkillPointAllocationRequest(this: void): void

declare function GetNumSkillLinesForClass(this: void, classId?: number): number

declare function GetSkillLineIdForClass(
  this: void,
  classId?: number,
  classSkillLineIndex?: number
): number

declare function GetSkillLineClassId(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number
): number

declare function StartSkillRespecFromUI(this: void): void

declare function AreCompanionSkillsInitialized(this: void): boolean

declare function GetCompanionSkillLineNameById(this: void, skillLineId?: number): string

declare function GetNumCompanionSkillLines(this: void, skillType?: SkillType): number

declare function GetCompanionSkillLineId(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number
): number

declare function GetCompanionSkillLineDynamicInfo(
  this: void,
  skillLineId?: number
): LuaMultiReturn<[rank: number, active: boolean, discovered: boolean]>

declare function GetCompanionSkillLineXPInfo(
  this: void,
  skillLineId?: number
): LuaMultiReturn<[lastRankXP: number, nextRankXP: number, currentXP: number]>

declare function GetNumAbilitiesInCompanionSkillLine(this: void, skillLineId?: number): number

declare function GetCompanionAbilityId(
  this: void,
  skillLineId?: number,
  abilityIndex?: number
): number

declare function GetCompanionAbilityRankRequired(this: void, abilityId?: number): number

declare function GetNumMailItemsByCategory(this: void, category?: MailCategory): number

declare function GetMailIdByIndex(this: void, category?: MailCategory, index?: number): Id64

declare function GetNextMailId(this: void, lastMailId?: Id64 | undefined): Id64 | undefined

declare function GetMailItemInfo(
  this: void,
  mailId?: Id64
): LuaMultiReturn<
  [
    senderDisplayName: string,
    senderCharacterName: string,
    subject: string,
    icon: string,
    unread: boolean,
    fromSystem: boolean,
    fromCustomerService: boolean,
    returned: boolean,
    numAttachments: number,
    attachedMoney: number,
    codAmount: number,
    expiresInDays: number | undefined,
    secsSinceReceived: number,
    category: MailCategory,
  ]
>

declare function SendMail(this: void, to?: string, subject?: string, body?: string): void

declare function ClearQueuedMail(this: void): void

declare function CloseMailbox(this: void): void

declare function RequestReadMail(this: void, mailId?: Id64): RequestReadMailResult

declare function DeleteMail(this: void, mailId?: Id64): void

declare function ReturnMail(this: void, mailId?: Id64): void

declare function ReadMail(this: void, mailId?: Id64): string

declare function CanQueueItemAttachment(
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  attachmentSlot?: number
): boolean

declare function QueueMoneyAttachment(this: void, amount?: number): void

declare function GetMailQueuedAttachmentLink(
  this: void,
  attachmentSlot?: number,
  linkStyle?: LinkStyle
): string

declare function GetQueuedItemAttachmentInfo(
  this: void,
  attachmentSlot?: number
): LuaMultiReturn<[bagId: Bag, slotIndex: number, icon: string, stack: number]>

declare function GetAttachedItemLink(
  this: void,
  mailId?: Id64,
  attachIndex?: number,
  linkStyle?: LinkStyle
): string

declare function GetAttachedItemInfo(
  this: void,
  mailId?: Id64,
  attachIndex?: number
): LuaMultiReturn<
  [
    icon: string,
    stack: number,
    creatorName: string,
    sellPrice: number,
    meetsUsageRequirement: boolean,
    equipType: number,
    itemStyleId: number,
    displayQuality: ItemDisplayQuality,
  ]
>

declare function TakeMailAttachments(this: void, mailId?: Id64, deleteOnClaim?: boolean): void

declare function TakeAllMailAttachmentsInCategory(
  this: void,
  category?: MailCategory,
  deleteOnClaim?: boolean
): void

declare function CanTryTakeAllMailAttachmentsInCategory(
  this: void,
  category?: MailCategory,
  deleteOnClaim?: boolean
): boolean

declare function RequestOpenMailbox(this: void): void

declare function IsReadMailInfoReady(this: void, mailId?: Id64): boolean

declare function QueueItemAttachment(
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  attachmentSlot?: number
): number

declare function GetNumAchievementCategories(this: void): number

declare function GetAchievementCategoryInfo(
  this: void,
  topLevelIndex?: number
): LuaMultiReturn<
  [
    name: string,
    numSubCatgories: number,
    numAchievements: number,
    earnedPoints: number,
    totalPoints: number,
    hidesPoints: boolean,
  ]
>

declare function GetAchievementSubCategoryInfo(
  this: void,
  topLevelIndex?: number,
  subCategoryIndex?: number
): LuaMultiReturn<
  [
    name: string,
    numAchievements: number,
    earnedPoints: number,
    totalPoints: number,
    hidesPoints: boolean,
  ]
>

declare function GetAchievementId(
  this: void,
  topLevelIndex?: number,
  categoryIndex?: number | undefined,
  achievementIndex?: number
): number

declare function GetAchievementProgress(this: void, achievementId?: number): Id64

declare function GetCategoryInfoFromAchievementId(
  this: void,
  achievementId?: number
): LuaMultiReturn<
  [
    topLevelIndex: number | undefined,
    categoryIndex: number | undefined,
    achievementIndex: number | undefined,
  ]
>

declare function GetFirstAchievementInLine(this: void, achievementId?: number): number

declare function GetNextAchievementInLine(this: void, achievementId?: number): number

declare function GetAchievementLink(
  this: void,
  achievementId?: number,
  linkStyle?: LinkStyle
): string

declare function GetAchievementIdFromLink(this: void, link?: string): number

declare function GetAchievementNameFromLink(this: void, link?: string): string

declare function GetAchievementRewardPoints(this: void, achievementId?: number): number

declare function GetSkyshardAchievementZoneId(this: void, achievementId?: number): number

declare function GetAchievementLinkedBookCollectionId(this: void, achievementId?: number): number

declare function GetNumExperiencePointsInCompanionLevel(
  this: void,
  level?: number
): number | undefined

declare function IsEnlightenedAvailableForCharacter(this: void): boolean

declare function GetMaxSpendableChampionPointsInAttribute(this: void): number

declare function GetMaxLevel(this: void): number

declare function GetAbilityProgressionAbilityId(
  this: void,
  progressionIndex?: number,
  morph?: number,
  rank?: number
): number

declare function GetProgressionSkillAbilityFxOverrideCollectibleIdByIndex(
  this: void,
  progressionId?: number,
  index?: number
): number

declare function GetActiveProgressionSkillAbilityFxOverrideCollectibleId(
  this: void,
  progressionId?: number
): number

declare function PurchaseAttributes(
  this: void,
  health?: number,
  magicka?: number,
  stamina?: number
): void

declare function SendAttributePointAllocationRequest(
  this: void,
  respecPaymentType?: RespecPaymentType,
  healthDelta?: number,
  magickaDelta?: number,
  staminaDelta?: number
): void

declare function GetAttributeSpentPoints(this: void, attributeType?: number): number

declare function GetAttributeUnspentPoints(this: void): number

declare function StartAttributeRespecFromUI(this: void): void

declare function GetNumLoreCategories(this: void): number

declare function GetLoreCategoryInfo(
  this: void,
  categoryIndex?: number
): LuaMultiReturn<[name: string, numCollections: number, categoryId: number]>

declare function GetLoreCollectionInfo(
  this: void,
  categoryIndex?: number,
  collectionIndex?: number
): LuaMultiReturn<
  [
    name: string,
    description: string,
    numKnownBooks: number,
    totalBooks: number,
    hidden: boolean,
    gamepadIcon: string,
    collectionId: number,
  ]
>

declare function GetLoreBookInfo(
  this: void,
  categoryIndex?: number,
  collectionIndex?: number,
  bookIndex?: number
): LuaMultiReturn<[title: string, icon: string, known: boolean, bookId: number]>

declare function GetLoreBookLink(
  this: void,
  categoryIndex?: number,
  collectionIndex?: number,
  bookIndex?: number,
  linkStyle?: LinkStyle
): string

declare function GetLoreBookTitleFromLink(this: void, link?: string): string

declare function GetLoreBookCollectionIndicesFromCollectionId(
  this: void,
  collectionId?: number
): LuaMultiReturn<[categoryIndex: number | undefined, collectionIndex: number | undefined]>

declare function GetLoreBookIndicesFromBookId(
  this: void,
  bookId?: number
): LuaMultiReturn<
  [
    categoryIndex: number | undefined,
    collectionIndex: number | undefined,
    bookIndex: number | undefined,
  ]
>

declare function GetLoreBookOverrideImageFromBookId(
  this: void,
  bookId?: number
): LuaMultiReturn<
  [overrideImage: string | undefined, overrideImageTitlePosition: AnchorPosition | undefined]
>

declare function GetNumUnlockedHirelingCorrespondence(
  this: void,
  hirelingType?: HirelingType
): LuaMultiReturn<[current: number, max: number]>

declare function GetHirelingCorrespondenceInfoByIndex(
  this: void,
  hirelingType?: HirelingType,
  index?: number
): LuaMultiReturn<[sender: string, subject: string, message: string, icon: string]>

declare function GetCraftingInteractionMode(this: void): CraftingInteractionMode

declare function GetCraftingInteractionType(this: void): TradeskillType

declare function IsAwaitingCraftingProcessResponse(this: void): boolean

declare function GetLastCraftingResultTotalInspiration(this: void): number

declare function GetNumLastCraftingResultLearnedTraits(this: void): number

declare function GetLastCraftingResultLearnedTraitInfo(
  this: void,
  resultIndex?: number
): LuaMultiReturn<
  [
    traitName: string,
    itemName: string,
    icon: string,
    sellPrice: number,
    meetsUsageRequirement: boolean,
    equipType: EquipType,
    itemStyleId: number,
    displayQuality: ItemDisplayQuality,
  ]
>

declare function GetLastCraftingResultItemLink(
  this: void,
  resultIndex?: number,
  linkStyle?: LinkStyle
): string

declare function PrepareDeconstructMessage(this: void): void

declare function AddItemToDeconstructMessage(
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  quantity?: number
): boolean

declare function SendDeconstructMessage(this: void): boolean

declare function GetNonCombatBonusLevelTypeForTradeskillType(
  this: void,
  tradeskillType?: TradeskillType
): NonCombatBonusType

declare function GetMaxIterationsPossibleForAlchemyItem(
  this: void,
  solventBagId?: Bag,
  solventSlotIndex?: number,
  reagent1BagId?: Bag,
  reagent1SlotIndex?: number,
  reagent2BagId?: Bag,
  reagent2SlotIndex?: number,
  reagent3BagId?: Bag | undefined,
  reagent3SlotIndex?: number | undefined
): LuaMultiReturn<[numIterations: number, limitReason: TradeskillResult]>

declare function CraftAlchemyItem(
  this: void,
  solventBagId?: Bag,
  solventSlotIndex?: number,
  reagent1BagId?: Bag,
  reagent1SlotIndex?: number,
  reagent2BagId?: Bag,
  reagent2SlotIndex?: number,
  reagent3BagId?: Bag | undefined,
  reagent3SlotIndex?: number | undefined,
  numIterations?: number
): void

declare function GetAlchemyResultingItemInfo(
  this: void,
  solventBagId?: Bag,
  solventSlotIndex?: number,
  reagent1BagId?: Bag,
  reagent1SlotIndex?: number,
  reagent2BagId?: Bag,
  reagent2SlotIndex?: number,
  reagent3BagId?: Bag | undefined,
  reagent3SlotIndex?: number | undefined
): LuaMultiReturn<
  [
    name: string,
    icon: string,
    stack: number,
    sellPrice: number,
    meetsUsageRequirement: boolean,
    equipType: EquipType,
    itemStyleId: number,
    displayQuality: ItemDisplayQuality,
    prospectiveAlchemyResult: ProspectiveAlchemyResult,
  ]
>

declare function GetAlchemyResultingItemLink(
  this: void,
  solventBagId?: Bag,
  solventSlotIndex?: number,
  reagent1BagId?: Bag,
  reagent1SlotIndex?: number,
  reagent2BagId?: Bag,
  reagent2SlotIndex?: number,
  reagent3BagId?: Bag | undefined,
  reagent3SlotIndex?: number | undefined,
  linkStyle?: LinkStyle
): LuaMultiReturn<[link: string, prospectiveAlchemyResult: ProspectiveAlchemyResult]>

declare function GetAlchemyResultQuantity(
  this: void,
  solventBagId?: Bag,
  solventSlotIndex?: number,
  numIterations?: number
): number

declare function GetAlchemyItemTraits(
  this: void,
  reagentBagId?: Bag,
  reagentSlotIndex?: number
): LuaMultiReturn<
  [
    trait: string | undefined,
    icon: string | undefined,
    matchIcon: string | undefined,
    cancellingTrait: string | undefined,
    conflictIcon: string | undefined,
    ...rest: (string | undefined)[],
  ]
>

declare function GetTraitIdFromBasePotion(this: void, itemId?: number): number

declare function IsAlchemySolvent(this: void, itemType?: ItemType): boolean

declare function IsAlchemySolventForItemAndMaterialId(
  this: void,
  solventBagId?: Bag,
  solventSlotIndex?: number,
  targetItemId?: number,
  targetMaterialItemId?: number
): boolean

declare function GetAlchemyResultingItemIdIfKnown(
  this: void,
  solventBagId?: Bag,
  solventSlotIndex?: number,
  reagent1BagId?: Bag,
  reagent1SlotIndex?: number,
  reagent2BagId?: Bag,
  reagent2SlotIndex?: number,
  reagent3BagId?: Bag | undefined,
  reagent3SlotIndex?: number | undefined,
  desiredEncodedTraits?: number | undefined
): number | undefined

declare function GetNumRecipeLists(this: void): number

declare function GetRecipeListInfo(
  this: void,
  recipeListIndex?: number
): LuaMultiReturn<
  [
    name: string,
    numRecipes: number,
    upIcon: string,
    downIcon: string,
    overIcon: string,
    deprecatedReturn: string,
    createSound: string,
  ]
>

declare function GetRecipeInfo(
  this: void,
  recipeListIndex?: number,
  recipeIndex?: number
): LuaMultiReturn<
  [
    known: boolean,
    name: string,
    numIngredients: number,
    provisionerLevelReq: number,
    qualityReq: number,
    specialIngredientType: ProvisionerSpecialIngredientType,
    requiredCraftingStationType: TradeskillType,
    resultItemId: number,
  ]
>

declare function GetRecipeIngredientRequiredQuantity(
  this: void,
  recipeListIndex?: number,
  recipeIndex?: number,
  ingredientIndex?: number
): number

declare function GetRecipeIngredientItemInfo(
  this: void,
  recipeListIndex?: number,
  recipeIndex?: number,
  ingredientIndex?: number
): LuaMultiReturn<
  [
    name: string,
    icon: string,
    requiredQuantity: number,
    sellPrice: number,
    displayQuality: ItemDisplayQuality,
  ]
>

declare function GetRecipeIngredientItemLink(
  this: void,
  recipeListIndex?: number,
  recipeIndex?: number,
  ingredientIndex?: number,
  linkStyle?: LinkStyle
): string

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
  linkStyle?: LinkStyle
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

declare function CraftProvisionerItem(
  this: void,
  recipeListIndex?: number,
  recipeIndex?: number,
  numIterations?: number
): void

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

declare function CraftEnchantingItem(
  this: void,
  potencyRuneBagId?: Bag,
  potencyRuneSlotIndex?: number,
  essenceRuneBagId?: Bag,
  essenceRuneSlotIndex?: number,
  aspectRuneBagId?: Bag,
  aspectRuneSlotIndex?: number,
  numIterations?: number
): void

declare function GetEnchantingResultingItemLink(
  this: void,
  potencyRuneBagId?: Bag,
  potencyRuneSlotIndex?: number,
  essenceRuneBagId?: Bag,
  essenceRuneSlotIndex?: number,
  aspectRuneBagId?: Bag,
  aspectRuneSlotIndex?: number,
  linkStyle?: LinkStyle
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

declare function RequestScribe(
  this: void,
  craftedAbilityId?: number,
  primaryScriptId?: number,
  secondaryScriptId?: number,
  tertiaryScriptId?: number
): void

declare function SetCraftedAbilityScriptSelectionOverride(
  this: void,
  craftedAbilityId?: number,
  primaryScriptId?: number,
  secondaryScriptId?: number,
  tertiaryScriptId?: number
): void

declare function IsCraftedAbilityScriptCompatibleWithSelections(
  this: void,
  checkScriptId?: number,
  craftedAbilityId?: number,
  selectedPrimaryScriptId?: number,
  selectedSecondaryScriptId?: number,
  selectedTertiaryScriptId?: number
): boolean

declare function ResetCraftedAbilityScriptSelectionOverride(this: void): void

declare function IsScribingEnabled(this: void): boolean

declare function GetNumCraftedAbilities(this: void): number

declare function GetCraftedAbilityIdAtIndex(this: void, index?: number): number

declare function GetScribingInkItemLink(this: void, linkStyle?: LinkStyle): string

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

declare function CraftSmithingItem(
  this: void,
  patternIndex?: number,
  materialIndex?: number,
  materialQuantity?: number,
  itemStyleId?: number,
  traitIndex?: number,
  useUniversalStyleItem?: boolean,
  numIterations?: number
): void

declare function GetSmithingPatternResultLink(
  this: void,
  patternIndex?: number,
  materialIndex?: number,
  materialQuantity?: number,
  itemStyleId?: number,
  traitIndex?: number,
  linkStyle?: LinkStyle
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
  linkStyle?: LinkStyle
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
  linkStyle?: LinkStyle
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
  linkStyle?: LinkStyle
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

declare function ResearchSmithingTrait(this: void, bagId?: Bag, slotIndex?: number): void

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
  linkStyle?: LinkStyle
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
  linkStyle?: LinkStyle
): string

declare function ImproveSmithingItem(
  this: void,
  itemToImproveBagId?: Bag,
  itemToImproveSlotIndex?: number,
  numBoostersToUse?: number
): void

declare function GetNumValidItemStyles(this: void): number

declare function GetValidItemStyleId(this: void, index?: number): number

declare function GetNumConsolidatedSmithingSets(this: void): number

declare function GetNumUnlockedConsolidatedSmithingSets(this: void): number

declare function IsConsolidatedSmithingSetIndexUnlocked(this: void, setIndex?: number): boolean

declare function IsConsolidatedSmithingItemSetIdUnlocked(this: void, itemSetId?: number): boolean

declare function GetConsolidatedSmithingItemSetIdByIndex(this: void, setIndex?: number): number

declare function SetActiveConsolidatedSmithingSetByIndex(
  this: void,
  setIndex?: number | undefined
): void

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

declare function UpdateSelectedLFGRole(this: void, role?: LFGRole): void

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

declare function SetFloatingMarkerGlobalAlpha(this: void, alpha?: number): void

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

declare function EquipOutfit(
  this: void,
  actorCategory?: GameplayActorCategory,
  outfitIndex?: number
): void

declare function UnequipOutfit(this: void, actorCategory?: GameplayActorCategory): void

declare function GetEquippedOutfitIndex(
  this: void,
  actorCategory?: GameplayActorCategory
): number | undefined

declare function GetFenceSellTransactionInfo(
  this: void
): LuaMultiReturn<[totalSells: number, sellsUsed: number, resetTimeSeconds: number]>

declare function GetFenceLaunderTransactionInfo(
  this: void
): LuaMultiReturn<[totalLaunders: number, laundersUsed: number, resetTimeSeconds: number]>

declare function CanChampionSkillTypeBeSlotted(
  this: void,
  championSkillType?: ChampionSkillType
): boolean

declare function GetChampionDisciplineName(this: void, disciplineId?: number): string

declare function GetChampionDisciplineType(
  this: void,
  disciplineId?: number
): ChampionDisciplineType

declare function GetNumChampionDisciplineSkills(this: void, disciplineIndex?: number): number

declare function GetChampionSkillName(this: void, championSkillId?: number): string

declare function GetNumPointsSpentOnChampionSkill(this: void, championSkillId?: number): number

declare function GetNumSpentChampionPoints(this: void, disciplineId?: number): number

declare function GetNumUnspentChampionPoints(this: void, disciplineId?: number): number

declare function GetChampionSkillDescription(
  this: void,
  championSkillId?: number,
  numPendingPoints?: number
): string

declare function GetChampionSkillCurrentBonusText(
  this: void,
  championSkillId?: number,
  numPendingPoints?: number
): string

declare function GetChampionAbilityId(this: void, championSkillId?: number): number

declare function GetChampionRespecCost(this: void): number

declare function GetChampionSkillLinkIds(
  this: void,
  championSkillId?: number
): LuaMultiReturn<[linkedSkillId: number, ...rest: number[]]>

declare function GetChampionSkillId(
  this: void,
  disciplineIndex?: number,
  championSkillIndex?: number
): number

declare function IsChampionSkillRootNode(this: void, championSkillId?: number): boolean

declare function DoesChampionSkillHaveJumpPoints(this: void, championSkillId?: number): boolean

declare function GetChampionSkillJumpPoints(
  this: void,
  championSkillId?: number
): LuaMultiReturn<[jumpPoint: number, ...rest: number[]]>

declare function GetChampionSkillMaxPoints(this: void, championSkillId?: number): number

declare function WouldChampionSkillNodeBeUnlocked(
  this: void,
  championSkillId?: number,
  pendingPoints?: number
): boolean

declare function GetChampionSkillType(this: void, championSkillId?: number): ChampionSkillType

declare function IsChampionSkillClusterRoot(this: void, championSkillId?: number): boolean

declare function GetChampionClusterName(this: void, rootChampionSkillId?: number): string

declare function GetChampionClusterSkillIds(
  this: void,
  rootChampionSkillId?: number
): LuaMultiReturn<[championSkillIds: number, ...rest: number[]]>

declare function PrepareChampionPurchaseRequest(this: void, respecNeeded?: boolean): void

declare function AddSkillToChampionPurchaseRequest(
  this: void,
  championSkillId?: number,
  newPendingPoints?: number
): void

declare function AddHotbarSlotToChampionPurchaseRequest(
  this: void,
  slotIndex?: number,
  championSkillId?: number
): void

declare function GetExpectedResultForChampionPurchaseRequest(this: void): ChampionPurchaseResult

declare function SendChampionPurchaseRequest(this: void): void

declare function GetChampionDisciplineId(this: void, disciplineIndex?: number): number

declare function GetDefaultQuickChatName(this: void, index?: number): string

declare function GetDefaultQuickChatMessage(this: void, index?: number): string

declare function ZoUTF8StringLength(this: void, string?: string): number

declare function GetCurrentZoneDungeonDifficulty(this: void): DungeonDifficulty

declare function GetCurrentZoneHouseId(this: void): number

declare function GetNumFurnitureCategories(this: void): number

declare function GetFurnitureCategoryId(this: void, categoryIndex?: number): number

declare function GetNumFurnitureSubcategories(this: void, categoryIndex?: number): number

declare function GetFurnitureSubcategoryId(
  this: void,
  categoryIndex?: number,
  subcategoryIndex?: number
): number

declare function IsPrimaryHouse(this: void, houseId?: number): boolean

declare function HousingEditorGetFurnitureWorldPosition(
  this: void,
  furnitureId?: Id64
): LuaMultiReturn<[worldX: number, worldY: number, worldZ: number]>

declare function GetHousingEditorMode(this: void): HousingEditorMode

declare function GetNextPlacedHousingFurnitureId(
  this: void,
  lastFurnitureId?: Id64 | undefined
): Id64 | undefined

declare function GetPlacedHousingFurnitureInfo(
  this: void,
  furnitureId?: Id64
): LuaMultiReturn<[itemName: string, icon: string, furnitureDataId: number]>

declare function GetPlacedHousingFurnitureDisplayQuality(
  this: void,
  furnitureId?: Id64
): ItemDisplayQuality

declare function GetCurrentHouseOwner(this: void): string

declare function IsOwnerOfCurrentHouse(this: void): boolean

declare function GetPlacedFurnitureLink(
  this: void,
  placedFurnitureId?: Id64,
  linkStyle?: LinkStyle
): LuaMultiReturn<[itemLink: string, collectibleLink: string]>

declare function GetCollectibleIdFromFurnitureId(this: void, furnitureId?: Id64): number

declare function RequestOpenUnsafeURL(this: void, URL?: string): void

declare function GetRearchLineInfoFromRetraitItem(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[craftingType: TradeskillType, researchLineName: string]>

declare function GetItemTraitTypeCategory(
  this: void,
  itemTraitType?: ItemTraitType
): ItemTraitTypeCategory

declare function GetNextZoneStoryZoneId(
  this: void,
  lastZoneId?: number | undefined
): number | undefined

declare function GetNumZoneActivitiesForZoneCompletionType(
  this: void,
  zoneId?: number,
  zoneCompletionType?: ZoneCompletionType
): number

declare function GetZoneActivityIdForZoneCompletionType(
  this: void,
  zoneId?: number,
  zoneCompletionType?: ZoneCompletionType,
  activitiyIndex?: number
): number

declare function IsZoneStoryActivityComplete(
  this: void,
  zoneId?: number,
  zoneCompletionType?: ZoneCompletionType,
  activityIndex?: number
): boolean

declare function GetZoneStoryActivityNameByActivityIndex(
  this: void,
  zoneId?: number,
  zoneCompletionType?: ZoneCompletionType,
  activityIndex?: number
): string

declare function GetPOIWorldEventInstanceId(
  this: void,
  zoneIndex?: number,
  poiIndex?: number
): number

declare function ClearGuildHistoryCache(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory | undefined,
  keepResultsFromLastNumSeconds?: number
): boolean

declare function GetNumGuildHistoryEvents(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory
): number

declare function GetGuildHistoryEventIndicesForTimeRange(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  newestTimeS?: number,
  oldestTimeS?: number
): LuaMultiReturn<[newestEventIndex: number | undefined, oldestEventIndex: number | undefined]>

declare function GetOldestGuildHistoryEventIndexForUpToDateEventsWithoutGaps(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory
): number | undefined

declare function GetNumGuildHistoryEventRanges(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory
): number

declare function GetGuildHistoryEventRangeInfo(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  rangeIndex?: number
): LuaMultiReturn<
  [newestTimeS: number, oldestTimeS: number, newestEventId: number, oldestEventId: number]
>

declare function GetGuildHistoryEventRangeIndexForEventId(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  eventId?: number
): number | undefined

declare function GetGuildHistoryEventIndex(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  eventId?: number
): number | undefined

declare function GetGuildHistoryEventId(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  eventIndex?: number
): number

declare function GetGuildHistoryEventTimestamp(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  eventIndex?: number
): number

declare function IsGuildHistoryEventRedacted(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  eventIndex?: number
): boolean

declare function GetGuildHistoryEventBasicInfo(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  eventIndex?: number
): LuaMultiReturn<[eventId: number, timestamp: number, isRedacted: boolean, eventType: number]>

declare function GetGuildHistoryTraderEventInfo(
  this: void,
  guildId?: number,
  eventIndex?: number
): LuaMultiReturn<
  [
    eventId: number,
    timestampS: number,
    isRedacted: boolean,
    eventType: GuildHistoryTraderEvent,
    sellerDisplayName: string,
    buyerDisplayName: string,
    itemLink: string,
    quantity: number,
    price: number,
    tax: number,
  ]
>

declare function CreateGuildHistoryRequest(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  newestTimeS?: number,
  oldestTimeS?: number
): number

declare function IsGuildHistoryRequestComplete(this: void, requestId?: number): boolean

declare function DoesGuildHistoryHaveOutstandingRequest(this: void): boolean

declare function RequestMoreGuildHistoryEvents(
  this: void,
  requestId?: number,
  queueRequestIfOnCooldown?: boolean,
  targetNewestEventId?: number | undefined,
  targetOldestEventId?: number | undefined
): GuildHistoryDataReadyState

declare function DestroyGuildHistoryRequest(this: void, requestId?: number): boolean

declare function DumpGuildHistoryChunkInformation(this: void, guildId?: number | undefined): void

declare function SetMapToDigSitePosition(this: void, digSiteId?: number): SetMapResultCode

declare function GetAntiquityLeadTimeRemainingSeconds(this: void, antiquityId?: number): number

declare function IsAntiquityRepeatable(this: void, antiquityId?: number): boolean

declare function GetAntiquityCategoryId(this: void, antiquityId?: number): number

declare function GetAntiquityDifficulty(this: void, antiquityId?: number): AntiquityDifficulty

declare function GetNextAntiquityId(
  this: void,
  lastAntiquityId?: number | undefined
): number | undefined

declare function GetAntiquityZoneId(this: void, antiquityId?: number): number

declare function GetAntiquityCategoryName(this: void, antiquityCategoryId?: number): string

declare function GetAntiquitySetRewardId(this: void, antiquitySetId?: number): number

declare function RequestItemReconstruction(
  this: void,
  itemDefId?: number,
  itemTrait?: ItemTraitType,
  itemQuality?: ItemQuality,
  currencyType?: CurrencyType
): void

declare function GetNextItemSetCollectionId(
  this: void,
  lastItemSetId?: number | undefined
): number | undefined

declare function GetItemSetCollectionCategoryId(this: void, itemSetId?: number): number

declare function GetItemSetName(this: void, itemSetId?: number): string

declare function GetItemSetType(this: void, itemSetId?: number): ItemSetType

declare function GetItemSetUnperfectedSetId(this: void, itemSetId?: number): number

declare function GetNumItemSetCollectionPieces(this: void, itemSetId?: number): number

declare function GetItemSetCollectionPieceInfo(
  this: void,
  itemSetId?: number,
  index?: number
): LuaMultiReturn<[pieceId: number, slot: ItemSetCollectionSlot_id64]>

declare function GetNumItemSetCollectionSlotsUnlocked(this: void, itemSetId?: number): number

declare function IsItemSetCollectionSlotUnlocked(
  this: void,
  itemSetId?: number,
  slot?: ItemSetCollectionSlot_id64
): boolean

declare function GetNumItemReconstructionCurrencyOptions(this: void): number

declare function GetItemReconstructionCurrencyOptionType(
  this: void,
  currencyOptionIndex?: number
): CurrencyType

declare function GetItemReconstructionCurrencyOptionCost(
  this: void,
  itemSetId?: number,
  currencyType?: CurrencyType
): number | undefined

declare function GetItemSetCollectionCategoryName(this: void, categoryId?: number): string

declare function GetItemSetCollectionCategoryParentId(this: void, categoryId?: number): number

declare function GetItemSetCollectionPieceItemLink(
  this: void,
  pieceId?: number,
  linkStyle?: LinkStyle,
  traitType?: ItemTraitType,
  upgradeItemFunctionalQuality?: ItemQuality | undefined
): string

declare function GetEquipmentFilterTypeForItemSetCollectionSlot(
  this: void,
  slot?: ItemSetCollectionSlot_id64
): EquipmentFilterType

declare function GetCollectibleCategoryNameByCategoryId(this: void, categoryId?: number): string

declare function HasActiveCompanion(this: void): boolean

declare function HasPendingCompanion(this: void): boolean

declare function GetActiveCompanionDefId(this: void): number

declare function GetPendingCompanionDefId(this: void): number

declare function GetCompanionCollectibleId(this: void, companionId?: number): number

declare function GetCompanionName(this: void, companionId?: number): string

declare function GetActiveCompanionLevelInfo(
  this: void
): LuaMultiReturn<[level: number, currentExperience: number]>

declare function GetMaximumRapport(this: void): number

declare function GetActiveCompanionRapportLevel(this: void): CompanionRapportLevel

declare function GetActiveCompanionRapport(this: void): number

declare function GetActiveCompanionRapportLevelDescription(
  this: void,
  rapportLevel?: CompanionRapportLevel
): string

declare function GetNumSkyshardsInZone(this: void, zoneId?: number): number

declare function GetZoneSkyshardId(this: void, zoneId?: number, skyshardIndex?: number): number

declare function GetNormalizedPositionForSkyshardId(
  this: void,
  skyshardId?: number
): LuaMultiReturn<[normalizedX: number, normalizedZ: number, isInCurrentMap: boolean]>

declare function GetSkyshardHint(this: void, skyshardId?: number): string

declare function GetSkyshardDiscoveryStatus(
  this: void,
  skyshardId?: number
): SkyshardDiscoveryStatus

declare function GetPromotionalEventCampaignProgress(
  this: void,
  campaignKey?: Id64
): LuaMultiReturn<
  [numActivitiesCompleted: number, capstoneRewardFlags: PromotionalEventRewardFlags]
>

declare function GetPromotionalEventCampaignActivityProgress(
  this: void,
  campaignKey?: Id64,
  activityIndex?: number
): LuaMultiReturn<[progress: number, rewardFlags: PromotionalEventRewardFlags]>

declare function TryAutoTrackNextPromotionalEventCampaign(this: void): Id64

declare function GetTrackedPromotionalEventActivityInfo(
  this: void
): LuaMultiReturn<[campaignKey: Id64, activityIndex: number]>

declare function IsGameCameraActive(this: void): boolean

declare function IsGameCameraUIModeActive(this: void): boolean

declare function GetUnitLevel(this: void, unitTag?: string): number

declare function GetUnitName(this: void, unitTag?: string): string

declare function GetUnitZoneIndex(this: void, unitTag?: string): number | undefined

declare function Logout(this: void): void

declare function IsBankOpen(this: void): boolean

declare function GetBankingBag(this: void): Bag

declare function DoesBankHoldCurrency(this: void, bagId?: Bag): boolean

declare function IsGuildBankOpen(this: void): boolean

declare function GetCurrencyAmount(
  this: void,
  currencyType?: CurrencyType,
  currencyLocation?: CurrencyLocation
): number

declare function GetPlayerStoredCurrencyAmount(this: void, currencyType?: CurrencyType): number

declare function GetMaxPossibleCurrency(
  this: void,
  currencyType?: CurrencyType,
  currencyLocation?: CurrencyLocation
): number

declare function GetMaxCurrencyTransfer(
  this: void,
  currencyType?: CurrencyType,
  fromLocation?: CurrencyLocation,
  toLocation?: CurrencyLocation
): number

declare function TransferCurrency(
  this: void,
  currencyType?: CurrencyType,
  amount?: number,
  fromLocation?: CurrencyLocation,
  toLocation?: CurrencyLocation
): void

declare function CanInteractWithItem(this: void, bagId?: Bag, slotIndex?: number): boolean

declare function DestroyItem(this: void, bagId?: Bag, slotIndex?: number): void

declare function GetBagSize(this: void, bagId?: Bag): number

declare function GetNumBagUsedSlots(this: void, bagId?: Bag): number

declare function GetNumBagFreeSlots(this: void, bagId?: Bag): number

declare function FindFirstEmptySlotInBag(this: void, bagId?: Bag): number | undefined

declare function GetItemFilterTypeInfo(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[itemFilterType: ItemFilterType, ...rest: ItemFilterType[]]>

declare function GetItemLinkFilterTypeInfo(
  this: void,
  itemLink?: string
): LuaMultiReturn<[itemFilterType: ItemFilterType, ...rest: ItemFilterType[]]>

declare function GetItemCooldownInfo(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[remain: number, duration: number]>

declare function IsItemBound(this: void, bagId?: Bag, slotIndex?: number): boolean

declare function IsItemReconstructed(this: void, bagId?: Bag, slotIndex?: number): boolean

declare function EnchantItem(
  this: void,
  itemToEnchantBagId?: Bag,
  itemToEnchantSlotIndex?: number,
  enchantmentToUseBagId?: Bag,
  enchantmentToUseSlotIndex?: number
): void

declare function GetAmountSoulGemWouldChargeItem(
  this: void,
  itemToChargeBagId?: Bag,
  itemToChargeSlotIndex?: number,
  soulGemToConsumeBagId?: Bag,
  soulGemToConsumeSlotIndex?: number
): number

declare function ChargeItemWithSoulGem(
  this: void,
  itemToChargeBagId?: Bag,
  itemToChargeSlotIndex?: number,
  soulGemToConsumeBagId?: Bag,
  soulGemToConsumeSlotIndex?: number
): void

declare function IsItemSoulGem(
  this: void,
  soulGemType?: SoulGemType,
  bagId?: Bag,
  slotIndex?: number
): boolean

declare function GetChargeInfoForItem(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[charges: number, maxCharges: number]>

declare function DoesItemHaveDurability(this: void, bagId?: Bag, slotIndex?: number): boolean

declare function GetItemCondition(this: void, bagId?: Bag, slotIndex?: number): number

declare function IsItemRepairKit(this: void, bagId?: Bag, slotIndex?: number): boolean

declare function IsItemNonCrownRepairKit(this: void, bagId?: Bag, slotIndex?: number): boolean

declare function IsItemNonGroupRepairKit(this: void, bagId?: Bag, slotIndex?: number): boolean

declare function GetRepairKitTier(this: void, bagId?: Bag, slotIndex?: number): number

declare function GetAmountRepairKitWouldRepairItem(
  this: void,
  itemToRepairBagId?: Bag,
  itemToRepairSlotIndex?: number,
  repairKitToConsumeBagId?: Bag,
  repairKitToConsumeSlotIndex?: number
): number

declare function RepairItemWithRepairKit(
  this: void,
  itemToRepairBagId?: Bag,
  itemToRepairSlotIndex?: number,
  repairKitToConsumeBagId?: Bag,
  repairKitToConsumeSlotIndex?: number
): void

declare function GetActiveWeaponPairInfo(
  this: void
): LuaMultiReturn<[activeWeaponPair: ActiveWeaponPair, locked: boolean]>

declare function GetHeldWeaponPair(this: void): ActiveWeaponPair

declare function GetItemLevel(this: void, bagId?: Bag, slotIndex?: number): number

declare function GetItemRequiredLevel(this: void, bagId?: Bag, slotIndex?: number): number

declare function GetItemRequiredChampionPoints(this: void, bagId?: Bag, slotIndex?: number): number

declare function GetItemTrait(this: void, bagId?: Bag, slotIndex?: number): ItemTraitType

declare function GetItemLinkTraitCategory(this: void, itemLink?: string): ItemTraitTypeCategory

declare function GetItemLinkTraitType(this: void, itemLink?: string): ItemTraitType

declare function GetItemCreatorName(this: void, bagId?: Bag, slotIndex?: number): string

declare function GetItemInfo(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<
  [
    icon: string,
    stack: number,
    sellPrice: number,
    meetsUsageRequirement: boolean,
    locked: boolean,
    equipType: EquipType,
    itemStyleId: number,
    functionalQuality: ItemQuality,
    displayQuality: ItemDisplayQuality,
  ]
>

declare function GetItemId(this: void, bagId?: Bag, slotIndex?: number): number

declare function GetItemActorCategory(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): GameplayActorCategory

declare function GetItemSellValueWithBonuses(this: void, bagId?: Bag, slotIndex?: number): number

declare function GetItemCraftingInfo(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<
  [
    usedInCraftingType: TradeskillType,
    itemType: ItemType,
    extraInfo1: number | undefined,
    extraInfo2: number | undefined,
    extraInfo3: number | undefined,
  ]
>

declare function GetItemType(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[itemType: ItemType, specializedItemType: SpecializedItemType]>

declare function GetItemArmorType(this: void, bagId?: Bag, slotIndex?: number): ArmorType

declare function GetItemWeaponType(this: void, bagId?: Bag, slotIndex?: number): WeaponType

declare function GetItemEquipmentFilterType(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): EquipmentFilterType

declare function GetItemUniqueId(this: void, bagId?: Bag, slotIndex?: number): Id64 | undefined

declare function GetItemFunctionalQuality(this: void, bagId?: Bag, slotIndex?: number): ItemQuality

declare function GetItemDisplayQuality(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): ItemDisplayQuality

declare function GetItemEquipType(this: void, bagId?: Bag, slotIndex?: number): EquipType

declare function GetSoulGemItemInfo(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[tier: number, soulGemType: SoulGemType]>

declare function IsItemSellableOnTradingHouse(this: void, bagId?: Bag, slotIndex?: number): boolean

declare function GetNextVirtualBagSlotId(
  this: void,
  lastSlotId?: number | undefined
): number | undefined

declare function CanItemBeVirtual(this: void, bagId?: Bag, slotIndex?: number): boolean

declare function IsItemBoPAndTradeable(this: void, bagId?: Bag, slotIndex?: number): boolean

declare function HasCraftBagAccess(this: void): boolean

declare function TransferToGuildBank(this: void, sourceBagId?: Bag, sourceSlotIndex?: number): void

declare function TransferFromGuildBank(this: void, slotId?: number): void

declare function HasAnyJunk(this: void, bagId?: Bag, excludeStolenItems?: boolean): boolean

declare function DestroyAllJunk(this: void): void

declare function StowAllFurnitureItems(this: void): void

declare function CanStowFurnitureItem(this: void, bagId?: Bag, slotIndex?: number): boolean

declare function DoesBagHaveSpaceFor(
  this: void,
  destinationBagId?: Bag,
  sourceBagId?: Bag,
  sourceSlotIndex?: number
): boolean

declare function IsItemPlayerLocked(this: void, bagId?: Bag, slotIndex?: number): boolean

declare function SetItemIsPlayerLocked(
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  playerLocked?: boolean
): void

declare function CanItemBeMarkedAsJunk(this: void, bagId?: Bag, slotIndex?: number): boolean

declare function IsItemJunk(this: void, bagId?: Bag, slotIndex?: number): boolean

declare function SetItemIsJunk(this: void, bagId?: Bag, slotIndex?: number, junk?: boolean): void

declare function HasItemInSlot(this: void, bagId?: Bag, slotIndex?: number): boolean

declare function GetItemLink(
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  linkStyle?: LinkStyle
): string

declare function GetItemLinkName(this: void, itemLink?: string): string

declare function GetItemLinkItemId(this: void, itemLink?: string): number

declare function GetItemLinkItemSetCollectionSlot(this: void, itemLink?: string): Id64

declare function GetItemLinkIcon(this: void, itemLink?: string): string

declare function GetItemLinkItemType(
  this: void,
  itemLink?: string
): LuaMultiReturn<[itemType: ItemType, specializedItemType: SpecializedItemType]>

declare function GetItemLinkItemUseType(this: void, itemLink?: string): ItemUseType

declare function GetItemLinkItemUseReferenceId(this: void, itemLink?: string): number

declare function GetItemLinkArmorType(this: void, itemLink?: string): ArmorType

declare function GetItemLinkWeaponType(this: void, itemLink?: string): WeaponType

declare function GetItemLinkWeaponPower(this: void, itemLink?: string): number

declare function GetItemLinkArmorRating(
  this: void,
  itemLink?: string,
  considerCondition?: boolean
): number

declare function GetItemLinkRequiredLevel(this: void, itemLink?: string): number

declare function GetItemLinkRequiredChampionPoints(this: void, itemLink?: string): number

declare function GetItemLinkValue(
  this: void,
  itemLink?: string,
  considerCondition?: boolean
): number

declare function GetItemLinkEnchantInfo(
  this: void,
  itemLink?: string
): LuaMultiReturn<[hasCharges: boolean, enchantHeader: string, enchantDescription: string]>

declare function GetItemLinkDefaultEnchantId(this: void, itemLink?: string): number

declare function GetItemLinkAppliedEnchantId(this: void, itemLink?: string): number

declare function GetItemLinkFinalEnchantId(this: void, itemLink?: string): number

declare function GetItemLinkOnUseAbilityInfo(
  this: void,
  itemLink?: string
): LuaMultiReturn<
  [
    hasAbility: boolean,
    abilityHeader: string,
    abilityDescription: string,
    cooldown: number,
    hasScaling: boolean,
    minLevel: number,
    maxLevel: number,
    isChampionPoints: boolean,
    remainingCooldown: number,
  ]
>

declare function GetItemLinkTraitOnUseAbilityInfo(
  this: void,
  itemLink?: string,
  index?: number
): LuaMultiReturn<
  [
    hasAbility: boolean,
    abilityDescription: string,
    cooldown: number,
    hasScaling: boolean,
    minLevel: number,
    maxLevel: number,
    isChampionPoints: boolean,
  ]
>

declare function GetItemLinkTraitInfo(
  this: void,
  itemLink?: string
): LuaMultiReturn<[traitType: ItemTraitType, traitDescription: string]>

declare function GetItemLinkSetInfo(
  this: void,
  itemLink?: string,
  equipped?: boolean
): LuaMultiReturn<
  [
    hasSet: boolean,
    setName: string,
    numBonuses: number,
    numNormalEquipped: number,
    maxEquipped: number,
    setId: number,
    numPerfectedEquipped: number,
  ]
>

declare function GetItemLinkSetBonusInfo(
  this: void,
  itemLink?: string,
  equipped?: boolean,
  index?: number
): LuaMultiReturn<[numRequired: number, bonusDescription: string, isPerfectedBonus: boolean]>

declare function GetItemSetInfo(
  this: void,
  itemSetId?: number
): LuaMultiReturn<
  [
    hasSet: boolean,
    setName: string,
    numBonuses: number,
    numNormalEquipped: number,
    numPerfectedEquipped: number,
    maxEquipped: number,
  ]
>

declare function GetItemSetBonusInfo(
  this: void,
  itemSetId?: number,
  index?: number
): LuaMultiReturn<[numRequired: number, bonusDescription: string, isPerfectedBonus: boolean]>

declare function IsItemLinkSetCollectionPiece(this: void, itemLink?: string): boolean

declare function GetItemLinkNumContainerSetIds(this: void, itemLink?: string): number

declare function GetItemLinkContainerSetInfo(
  this: void,
  itemLink?: string,
  containerSetIndex?: number
): LuaMultiReturn<
  [
    hasSet: boolean,
    setName: string,
    numBonuses: number,
    numNormalEquipped: number,
    maxEquipped: number,
    setId: number,
    numPerfectedEquipped: number,
  ]
>

declare function GetItemLinkFlavorText(this: void, itemLink?: string): string

declare function IsItemLinkCrafted(this: void, itemLink?: string): boolean

declare function GetItemLinkFunctionalQuality(this: void, itemLink?: string): ItemQuality

declare function GetItemLinkDisplayQuality(this: void, itemLink?: string): ItemDisplayQuality

declare function IsItemLinkUnique(this: void, itemLink?: string): boolean

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
  linkStyle?: LinkStyle
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
  linkStyle?: LinkStyle
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
  linkStyle?: LinkStyle
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

declare function StackBag(this: void, bagId?: Bag): void

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

declare function UseCollectible(
  this: void,
  collectibleId?: number,
  actorCategory?: GameplayActorCategory
): void

declare function GetCollectibleLink(
  this: void,
  collectibleId?: number,
  linkStyle?: LinkStyle
): string

declare function GetCollectibleIdFromLink(this: void, link?: string): number | undefined

declare function GetCollectibleNickname(this: void, collectibleId?: number): string

declare function IsCollectibleUnlocked(this: void, collectibleId?: number): boolean

declare function SetOrClearCollectibleUserFlag(
  this: void,
  collectibleId?: number,
  userFlag?: CollectibleUserFlags,
  isSet?: boolean
): void

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

declare function RequestJumpToHouse(this: void, houseId?: number, jumpOutside?: boolean): void

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

declare function PlayEmoteByIndex(this: void, emoteIndex?: number): void

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
  linkStyle?: LinkStyle
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

declare function GetAntiquitySetId(this: void, antiquityId?: number): number

declare function GetNumAntiquitiesRecovered(this: void, antiquityId?: number): number

declare function GetNumAntiquityLoreEntriesAcquired(this: void, antiquityId?: number): number

declare function DoesAntiquityHaveLead(this: void, antiquityId?: number): boolean

declare function GetAntiquitySetName(this: void, antiquitySetId?: number): string

declare function GetAntiquitySetQuality(this: void, antiquitySetId?: number): AntiquityQuality

declare function GetNumAntiquitySetAntiquities(this: void, antiquitySetId?: number): number

declare function GetAntiquitySetAntiquityId(
  this: void,
  antiquitySetId?: number,
  antiquityIndex?: number
): number

declare function GetAbilityName(this: void, abilityId?: number, casterUnitTag?: string): string

declare function GetAbilityCastInfo(
  this: void,
  abilityId?: number,
  overrideRank?: number | undefined,
  casterUnitTag?: string
): LuaMultiReturn<[channeled: boolean | undefined, durationValue: number | undefined]>

declare function GetAbilityTargetDescription(
  this: void,
  abilityId?: number,
  overrideRank?: number | undefined,
  casterUnitTag?: string
): string | undefined

declare function GetAbilityRange(
  this: void,
  abilityId?: number,
  overrideRank?: number | undefined,
  casterUnitTag?: string
): LuaMultiReturn<[minRangeCM: number | undefined, maxRangeCM: number | undefined]>

declare function GetAbilityRadius(
  this: void,
  abilityId?: number,
  overrideRank?: number | undefined,
  casterUnitTag?: string
): number | undefined

declare function GetAbilityAngleDistance(this: void, abilityId?: number): number | undefined

declare function IsAbilityDurationToggled(
  this: void,
  abilityId?: number,
  casterUnitTag?: string
): boolean | undefined

declare function GetAbilityDuration(
  this: void,
  abilityId?: number,
  overrideRank?: number | undefined,
  casterUnitTag?: string
): number | undefined

declare function GetAbilityCooldown(
  this: void,
  abilityId?: number,
  casterUnitTag?: string
): number | undefined

declare function GetAbilityIcon(this: void, abilityId?: number): string

declare function GetNextAbilityMechanicFlag(
  this: void,
  abilityId?: number,
  lastMechanicFlag?: CombatMechanicFlags | undefined
): CombatMechanicFlags | undefined

declare function GetAbilityBaseCostInfo(
  this: void,
  abilityId?: number,
  overrideRank?: number | undefined,
  casterUnitTag?: string
): LuaMultiReturn<
  [
    baseCost: number | undefined,
    mechanicFlags: CombatMechanicFlags | undefined,
    isCostChargedPerTick: boolean | undefined,
  ]
>

declare function GetAbilityCost(
  this: void,
  abilityId?: number,
  mechanicFlag?: CombatMechanicFlags,
  overrideRank?: number | undefined,
  casterUnitTag?: string
): number

declare function GetAbilityCostPerTick(
  this: void,
  abilityId?: number,
  mechanic?: CombatMechanicFlags,
  overrideRank?: number | undefined
): number

declare function GetAbilityFrequencyMS(
  this: void,
  abilityId?: number,
  casterUnitTag?: string
): number | undefined

declare function GetAbilityRoles(
  this: void,
  abilityId?: number
): LuaMultiReturn<
  [isTankRoleAbility: boolean, isHealerRoleAbility: boolean, isDamageRoleAbility: boolean]
>

declare function GetAbilityDescription(
  this: void,
  abilityId?: number,
  overrideRank?: number | undefined,
  casterUnitTag?: string
): string

declare function IsAbilityPassive(this: void, abilityId?: number): boolean

declare function IsAbilityUltimate(this: void, abilityId?: number): boolean

declare function GetAbilityCraftedAbilityId(this: void, abilityId?: number): number

declare function IsItemSetCollectionPieceUnlocked(this: void, pieceId?: number): boolean

declare function GetSkillLineNameById(this: void, skillLineId?: number): string

declare function GetNumTributePatrons(this: void): number

declare function GetTributePatronIdAtIndex(this: void, index?: number): number

declare function GetTributePatronCollectibleId(this: void, patronId?: number): number

declare function GetTributeCardName(this: void, cardDefId?: number): string

declare function GetTributePatronName(this: void, patronId?: number): string

declare function GetTributePatronCategoryId(this: void, patronId?: number): number

declare function GetTributePatronCategoryName(this: void, categoryId?: number): string

declare function GetTributePatronNumDockCards(this: void, patronId?: number): number

declare function GetTributePatronDockCardInfoByIndex(
  this: void,
  patronId?: number,
  cardIndex?: number
): LuaMultiReturn<[baseCardId: number, upgradeCardId: number, quantity: number]>

declare function GetMailAttachmentInfo(
  this: void,
  mailId?: Id64
): LuaMultiReturn<[numAttachments: number, attachedMoney: number, codAmount: number]>

declare function IsPromotionalEventSystemLocked(this: void): boolean

declare function GetNumActivePromotionalEventCampaigns(this: void): number

declare function GetActivePromotionalEventCampaignKey(this: void, campaignIndex?: number): Id64

declare function GetPromotionalEventCampaignInfo(
  this: void,
  campaignKey?: Id64
): LuaMultiReturn<
  [
    campaignId: number,
    numActivities: number,
    numMilestones: number,
    capstoneCompletionThreshold: number,
    capstoneRewardId: number,
    capstoneRewardQuantity: number,
  ]
>

declare function IsCurrentCampaignVengeanceRuleset(this: void): boolean

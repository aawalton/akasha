interface CenterScreenMessageParams {
  mainText: string
}

type CenterScreenHandler = (this: void, ...args: unknown[]) => CenterScreenMessageParams | undefined

declare const ZO_CenterScreenAnnounce_GetEventHandlers: (
  this: void
) => Record<number, CenterScreenHandler>

type AlertTextHandler = (this: void, ...args: unknown[]) => unknown

declare const ZO_AlertText_GetHandlers: (this: void) => Record<number, AlertTextHandler>

interface ZO_RecentMessagesInstance {
  expiryDelayMilliseconds: number
  ShouldDisplayMessage: (this: ZO_RecentMessagesInstance, message: string | number) => boolean
}

interface ZO_RecentMessagesStatic {
  New: (this: ZO_RecentMessagesStatic, expiryDelayMilliseconds: number) => ZO_RecentMessagesInstance
}

declare const ZO_RecentMessages: ZO_RecentMessagesStatic

interface Scene {
  HasFragment: (this: unknown, fragment: SceneFragment) => boolean
  toRestore?: SceneFragment[] | boolean
}

interface SceneManager {
  scenes: Record<string, Scene | undefined>
}

declare const FRAME_PLAYER_FRAGMENT: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_INVENTORY: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_SKILLS: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_JOURNAL: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_MAP: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_SOCIAL: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_AVA: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_SYSTEM: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_LOOT: SceneFragment
declare const FRAME_EMOTE_FRAGMENT_CHAMPION: SceneFragment
declare const MINIMIZE_CHAT_FRAGMENT: SceneFragment
declare const TRADING_HOUSE_SCENE: Scene

interface EndInWorldInteractionsFragment {
  OnShown: (this: EndInWorldInteractionsFragment) => undefined
}

declare const END_IN_WORLD_INTERACTIONS_FRAGMENT: EndInWorldInteractionsFragment

interface EsoEventControl {
  RegisterForEvent: (
    this: EsoEventControl,
    eventId: number,
    callback: (this: void, ...args: never[]) => undefined
  ) => undefined
  UnregisterForEvent: (this: EsoEventControl, eventId: number) => undefined
  AddFilterForEvent: (
    this: EsoEventControl,
    eventId: number,
    filterType: number,
    filterValue: unknown
  ) => undefined
}

declare const RETICLE: object

interface ZoKeyboardNotificationManager {
  sortFilterList: { control?: Control; list?: NotificationsList; [key: string]: unknown }
  providers: object[]
  RefreshNotificationList: (this: ZoKeyboardNotificationManager) => undefined
  [key: string]: unknown
}

declare const NOTIFICATIONS: ZoKeyboardNotificationManager | undefined

declare const ZO_Menu_SetLastCommandWasFromMenu: (this: void, fromMenu: boolean) => undefined
declare const SlashCommandAutoComplete: object
declare const ZO_GamepadStoreManager: { RepairMessageBox?: unknown } | undefined

declare const ZO_SmithingTopLevelCreationPanelStyleListUniversalStyleItem: {
  SetHidden: (this: unknown, hidden: boolean) => undefined
}

declare const MAIL_MANAGER_GAMEPAD: {
  inbox: { GetActiveMailId: (this: unknown) => Id64 }
}

interface ErrorFrameSingleton {
  OnUIError: (this: ErrorFrameSingleton, errString: string) => undefined
}

declare const ZO_ERROR_FRAME: ErrorFrameSingleton

interface MailInbox {
  mailId?: Id64
}

declare const ZO_LeaderboardScoreProvider: object
declare const ZO_GuildMotDProvider: object
declare const ZO_CraftBagAutoTransferProvider: object
declare const ZO_GuildInviteProvider: object
declare const ZO_GuildNewApplicationsProvider: object
declare const ZO_GuildRosterManager: object | undefined
declare const GUILD_ROSTER: object

declare const GUILD_HOME: {
  keybindStripDescriptor: Record<number, { visible: (this: void) => boolean } | undefined>
  guildId: number
  guildName: string
}

interface PlayerToPlayer {
  control: EsoEventControl
  incomingQueue: Array<{ incomingType: number }>
  AddPromptToIncomingQueue: (
    this: PlayerToPlayer,
    incomingType: number,
    uniqueIdentifier: unknown,
    name: string,
    message: string,
    acceptCallback: (this: void) => undefined,
    declineCallback: (this: void) => undefined,
    deferDecisionCallback: (this: void) => undefined
  ) => { guildId?: number }
}

interface LoreReader {
  control: EsoEventControl
  OpenSound: string
}

declare const INTERACTION: {
  eventCallbacks: Record<number, (this: void, ...args: unknown[]) => undefined>
  control: EsoEventControl
}

declare const ZO_NormalizeSecondsSince: (this: void, seconds: number) => number
declare const ZO_FormatUserFacingDisplayName: (this: void, displayName: string) => string
declare const ZO_Dialogs_ReleaseAllDialogsOfName: (this: void, name: string) => undefined
declare const EquipItem: (this: void, bagId: number, slotIndex: number) => undefined
declare const GetAllianceBannerIcon: (this: void, alliance: number) => string

declare const ALERT: number
declare const ZO_ADJUSTED_UNIVERSAL_STYLE_ITEM_INDEX: number

declare const EVENT_IMPERIAL_CITY_ACCESS_GAINED_NOTIFICATION: number
declare const EVENT_IMPERIAL_CITY_ACCESS_LOST_NOTIFICATION: number

declare const SI_GUILD_ROSTER_ADDED: number
declare const SI_GUILD_ROSTER_REMOVED: number
declare const SI_ENDLESS_DUNGEON_LEADERBOARDS_CATEGORIES_HEADER: number
declare const SI_PLAYER_TO_PLAYER_INCOMING_GUILD_REQUEST: number
declare const SI_TRADESKILLRESULT119: number
declare const SI_SMITHING_EXTRACTION_FAILED: number
declare const SI_SMITHING_DECONSTRUCTION_LEVEL_PENALTY: number
declare const SI_ALCHEMY_NO_YIELD: number
declare const SI_ENCHANT_NO_YIELD: number
declare const SI_ITEM_ACTION_REPORT_ITEM: number
declare const SI_GAMEPAD_MAIN_MENU_CROWN_STORE_CATEGORY: number
declare const SI_WINDOW_TITLE_LORE_LIBRARY: number
declare const SI_NOTIFICATIONTYPE15: number
declare const SI_WINDOW_TITLE_SKILLS: number
declare const SI_MAIN_MENU_INVENTORY: number
declare const SI_MAIN_MENU_MAP: number
declare const SI_JOURNAL_MENU_QUESTS: number
declare const SI_CHAT_TAB_GENERAL: number

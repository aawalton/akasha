interface RewardsManager {
  GetRewardContextualTypeString: (rewardId: number) => string
}
declare const REWARDS_MANAGER: RewardsManager
declare function ZO_FormatTime(
  seconds: number,
  formatStyle: number,
  precision?: number,
  direction?: number
): string
declare function GetNumAchievements(
  categoryIndex: number,
  subcategoryIndex: number | undefined
): number
declare function GetNumAchievementSubCategories(categoryIndex: number): number
declare function ZO_GetAchievementIds(
  categoryIndex: number,
  subcategoryIndex: number | undefined,
  numAchievements: number,
  considerSearchResults: boolean
): number[]

declare function IsLoreBookKnown(
  categoryIndex: number,
  collectionIndex: number,
  bookIndex: number
): boolean

interface ItemSetCollectionCategory {
  categoryId: number
}
interface ItemSetCollectionData {
  categoryId: number
}
interface ItemSetCollectionsDataManager {
  itemSetCollectionCategories: ItemSetCollectionCategory[]
  itemSetCollections: Record<number, ItemSetCollectionData>
}
declare const ITEM_SET_COLLECTIONS_DATA_MANAGER: ItemSetCollectionsDataManager

declare function ZO_PreHook(
  existingFunctionName: string,
  hookFunction: (...args: never[]) => unknown
): ((...args: unknown[]) => unknown) | undefined
declare function ZO_PreHook(
  objectTable: object,
  existingFunctionNameOrEventId: string | number,
  hookFunction: (...args: never[]) => unknown
): ((...args: unknown[]) => unknown) | undefined
declare const ZO_PostHookHandler: (
  control: Control,
  handlerName: string,
  hookFunction: (this: void, ...args: never[]) => void
) => void

declare const UseItem: (bagId: Bag, slotIndex: number) => void

declare const RequestMoveItem: (
  sourceBag: Bag,
  sourceSlot: number,
  targetBag: Bag,
  targetSlot: number,
  stackCount: number
) => void
declare const CallSecureProtected: (name: string, ...args: unknown[]) => void

declare const PickupInventoryItem: (bagId: Bag, slotIndex: number) => void
declare const PlaceInTransfer: () => void

interface SharedInteraction {
  CloseChatterAndDismissAssistant: (this: SharedInteraction) => void
}
declare const ZO_SharedInteraction: SharedInteraction

interface SkillPointAllocationManager {
  GetAvailableSkillPoints: () => number
  GetNumPointsAllocatedInSkillLine: (skillLineData: SkillLineData) => number
  GetTotalNumSkillPoints: () => number
}
declare const SKILL_POINT_ALLOCATION_MANAGER: SkillPointAllocationManager

interface KeyboardSkillsWindow {
  RefreshSkillPointInfo: () => void
  availablePointsLabel: LabelControl
  skyShardsLabel: LabelControl
}
declare const SKILLS_WINDOW: KeyboardSkillsWindow

interface GamepadSkillsHeaderData {
  data1Text: string
  data2Text: string
}
interface GamepadSkillsScene {
  RefreshPointsDisplay: () => void
  header: Control
  headerData: GamepadSkillsHeaderData
}
declare const GAMEPAD_SKILLS: GamepadSkillsScene

declare const ZO_GamepadGenericHeader_RefreshData: (header: Control, headerData: unknown) => void

declare const ZO_PostHook: ((
  objectTable: object,
  methodName: string,
  hookFunction: (this: void, ...args: never[]) => void
) => void) &
  ((existingFunctionName: string, hookFunction: (this: void, ...args: never[]) => unknown) => void)

declare const RedirectTexture: (originalTexturePath: string, newTexturePath: string) => void

interface ZO_DialogInfo {
  canQueue?: boolean
  gamepadInfo?: { dialogType: number; allowShowOnNextScene?: boolean }
  title?: { text: string | number | ((this: void, dialog: ZO_DialogData) => string) | undefined }
  mainText?: { text: string | number | ((this: void, dialog: ZO_DialogData) => string) | undefined }
  buttons?: Array<{
    text: string | number
    keybind?: string
    callback?: (this: void, dialog: ZO_DialogData) => void
    requiresTextInput?: boolean
  }>
}

interface ZO_DialogData extends Control {
  data: Record<string, unknown>
}

declare const ZO_Dialogs_RegisterCustomDialog: (name: string, info: ZO_DialogInfo) => void
declare const ZO_Dialogs_ShowDialog: (name: string, data?: Record<string, unknown>) => void
declare const ZO_Dialogs_ReleaseDialog: (name: string, allViewTypes?: boolean) => void
declare function ZO_Dialogs_IsShowing(name: string): boolean

declare const GAMEPAD_DIALOGS: { readonly BASIC: number } & Readonly<Record<string, number>>

declare const ESO_Dialogs: Record<string, ZO_DialogInfo>

declare function ZO_CraftingUtils_IsPerformingCraftProcess(): boolean

interface ZO_VisibleEnchanting {
  potencySound?: string
  potencyLength?: number
  essenceSound?: string
  essenceLength?: number
  aspectSound?: string
  aspectLength?: number
  [key: string]: unknown
}
declare function ZO_Enchanting_GetVisibleEnchanting(): ZO_VisibleEnchanting | undefined

declare const ZO_LinkHandler_OnLinkMouseUp: (link: string, button: number, control: Control) => void

declare const ACTION_RESULT_EFFECT_GAINED: number
declare const ACTION_RESULT_EFFECT_GAINED_DURATION: number
declare const ACTION_RESULT_EFFECT_FADED: number
declare const ACTION_RESULT_BEGIN: number

declare const COMBAT_MECHANIC_FLAGS_ITERATION_END: number | undefined

declare const EQUIP_SLOT_ITERATION_BEGIN: number
declare const EQUIP_SLOT_ITERATION_END: number

declare const SafeAddVersion: (stringId: string | number, version: number) => void

declare function ZO_LinkHandler_ParseLink(
  link: string
): LuaMultiReturn<
  [
    text: string | undefined,
    color: string | undefined,
    linkType: string | undefined,
    field4: string | undefined,
    field5: string | undefined,
    field6: string | undefined,
    field7: string | undefined,
    field8: string | undefined,
    field9: string | undefined,
    field10: string | undefined,
    field11: string | undefined,
    field12: string | undefined,
    field13: string | undefined,
    field14: string | undefined,
    field15: string | undefined,
    field16: string | undefined,
    field17: string | undefined,
    field18: string | undefined,
    field19: string | undefined,
    field20: string | undefined,
    field21: string | undefined,
    field22: string | undefined,
    field23: string | undefined,
    field24: string | undefined,
  ]
>

declare function GetCraftingSkillLineIndices(
  tradeskillType: number
): LuaMultiReturn<[skillType: number, skillLineIndex: number]>

declare const ZO_Dialogs_ShowPlatformDialog: (
  name: string,
  data?: unknown,
  textParams?: unknown
) => void

declare const NON_COMBAT_BONUS_HAGGLING: number

declare const KEYBIND_STRIP_ALIGN_CENTER: number

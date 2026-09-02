import type {
  GuildHistoryStatusTooltipInstance,
  StatusTooltipCacheRef,
} from "../histoire-status-tooltip/histoire-status-tooltip.module.code.ts"

export const BUTTON_NORMAL_TEXTURE = "LibHistoire/image/histy_up.dds"
export const BUTTON_PRESSED_TEXTURE = "LibHistoire/image/histy_down.dds"
export const LINKED_ICON = "LibHistoire/image/linked_down.dds"
export const UNLINKED_ICON = "LibHistoire/image/unlinked_down.dds"
export const REQUEST_MODE_ICON_SIZE = 32
export const REQUEST_MODE_FORCE_ON_ICON = "EsoUI/Art/Miscellaneous/Keyboard/visible_up.dds"
export const REQUEST_MODE_FORCE_OFF_ICON = "EsoUI/Art/Miscellaneous/Keyboard/hidden_up.dds"
export const DEFAULT_COLOR = ZO_NORMAL_TEXT
export const SELECTED_COLOR = ZO_SELECTED_TEXT

export const DATA_ENTRY = 1
export const ROW_HEIGHT = 52

export const guildHistoryScene = SCENE_MANAGER.GetScene("guildHistory")

export function asWindowHistoryCacheRef(value: unknown): WindowHistoryCacheRef {
  return value as WindowHistoryCacheRef
}
export function asStatusTooltipCacheRef(value: unknown): StatusTooltipCacheRef {
  return value as StatusTooltipCacheRef
}
export function asControl(value: unknown): Control {
  return value as Control
}
export function asNumber(value: unknown): number {
  return value as number
}
export function asBoolean(value: unknown): boolean {
  return value as boolean
}

export function requireChild<T extends Control>(parent: Control, name: string): T {
  const child = parent.GetNamedChild<T>(name)
  if (child == null) {
    error("LibHistoire: missing named child '" + name + "'")
  }
  return child
}

export interface WindowCacheRef {
  GetGuildId: (this: WindowCacheRef) => number
  GetCategory?: (this: WindowCacheRef) => number
  HasLinked: (this: WindowCacheRef) => boolean
  IsProcessing: (this: WindowCacheRef) => boolean
  UpdateProgressBar: (this: WindowCacheRef, bar: unknown) => void
  GetRequestMode?: (this: WindowCacheRef) => string
  SetRequestMode?: (this: WindowCacheRef, mode: string) => void
  Reset?: (this: WindowCacheRef) => void
  Clear?: (this: WindowCacheRef) => boolean | undefined
}

export interface RowEntry {
  label: string
  cache: WindowCacheRef
  value: number
  selected: boolean
}

export interface SelectedCacheRef {
  GetGuildId: (this: SelectedCacheRef) => number
  GetCategory: (this: SelectedCacheRef) => number
}

export interface WindowHistoryAdapterRef {
  GetSelectedCategoryCache: (this: WindowHistoryAdapterRef) => SelectedCacheRef
  SelectGuildByIndex: (this: WindowHistoryAdapterRef, guildIndex: number) => void
  SelectCategory: (this: WindowHistoryAdapterRef, category: number) => void
}

export interface WindowHistoryCacheRef {
  ForEachActiveGuild: (
    this: WindowHistoryCacheRef,
    func: (this: void, guildCache: WindowCacheRef) => void
  ) => void
  GetCategoryCache: (
    this: WindowHistoryCacheRef,
    guildId: number,
    category: number
  ) => WindowCacheRef
  VerifyRequests: (this: WindowHistoryCacheRef) => void
  DeleteRequests: (this: WindowHistoryCacheRef) => void
  GetDebugInfo: (this: WindowHistoryCacheRef) => LuaTable<string, unknown>
}

export interface WindowSaveData {
  x?: number
  y?: number
  locked?: boolean
  enabled?: boolean
  zoomMode?: string
}

export interface SelectionWidgetRef {
  SelectGuild: (this: SelectionWidgetRef, index: number) => void
  SelectCategory: (this: SelectionWidgetRef, index: number) => void
  SetGuildCount: (this: SelectionWidgetRef, count: number) => void
  SetCategoryCount: (this: SelectionWidgetRef, count: number) => void
  Update: (this: SelectionWidgetRef) => void
}

export interface GuildHistoryStatusWindowInstance {
  historyAdapter: WindowHistoryAdapterRef
  statusTooltip: GuildHistoryStatusTooltipInstance
  saveData: WindowSaveData
  guildId: number
  category: number
  fragment: SceneFragment
  control: TopLevelWindow
  labelControl: LabelControl
  guildListControl: Control
  categoryListControl: Control
  selectionWidget: SelectionWidgetRef
  statusIcon: TextureControl
  optionsButton: ButtonControl
  toggleWindowButton: ButtonControl
  emptyGuildListRow: Control
  hasLinkedEverything?: boolean

  Initialize: (
    this: GuildHistoryStatusWindowInstance,
    historyAdapter: WindowHistoryAdapterRef,
    statusTooltip: GuildHistoryStatusTooltipInstance,
    saveData: WindowSaveData
  ) => void
  InitializeButtons: (this: GuildHistoryStatusWindowInstance) => void
  InitializeBaseList: (
    this: GuildHistoryStatusWindowInstance,
    listControl: Control,
    template: string,
    OnInit: (this: void, rowControl: Control) => void,
    OnUpdate?: (this: void, rowControl: Control, entry: RowEntry) => void
  ) => void
  InitializeGuildList: (this: GuildHistoryStatusWindowInstance, listControl: Control) => void
  InitializeCategoryList: (this: GuildHistoryStatusWindowInstance, listControl: Control) => void
  SetGuildId: (this: GuildHistoryStatusWindowInstance, guildId: number) => void
  SetCategory: (this: GuildHistoryStatusWindowInstance, category: number) => void
  CreateDataEntry: (
    this: GuildHistoryStatusWindowInstance,
    label: string,
    cache: WindowCacheRef,
    value: number,
    selected: boolean
  ) => ZoScrollListDataEntry<RowEntry>
  Update: (this: GuildHistoryStatusWindowInstance) => void
  SavePosition: (this: GuildHistoryStatusWindowInstance) => void
  LoadPosition: (this: GuildHistoryStatusWindowInstance) => void
  ResetPosition: (this: GuildHistoryStatusWindowInstance) => void
  IsLocked: (this: GuildHistoryStatusWindowInstance) => boolean | undefined
  Lock: (this: GuildHistoryStatusWindowInstance) => void
  Unlock: (this: GuildHistoryStatusWindowInstance) => void
  IsShowing: (this: GuildHistoryStatusWindowInstance) => boolean
  IsEnabled: (this: GuildHistoryStatusWindowInstance) => boolean | undefined
  Enable: (this: GuildHistoryStatusWindowInstance) => void
  Disable: (this: GuildHistoryStatusWindowInstance) => void
  GetZoomMode: (this: GuildHistoryStatusWindowInstance) => string
  SetZoomMode: (this: GuildHistoryStatusWindowInstance, zoomMode: string) => void
  ShowDebugInfo: (this: GuildHistoryStatusWindowInstance) => void
}

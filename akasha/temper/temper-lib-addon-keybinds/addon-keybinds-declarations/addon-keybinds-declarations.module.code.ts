import type { KeybindScrollEntry } from "../addon-keybinds-types/addon-keybinds-types.module.code.ts"

declare global {
  type AnyNotNil = {}

  interface LuaTable<TKey extends AnyNotNil = AnyNotNil, TValue = unknown>
    extends Iterable<[TKey, TValue]> {
    get: (key: TKey) => TValue
    set: (key: TKey, value: TValue) => undefined
  }

  const LuaTable: new <TKey extends AnyNotNil = AnyNotNil, TValue = unknown>() => LuaTable<
    TKey,
    TValue
  >

  function type(
    this: void,
    v: unknown
  ): "nil" | "number" | "string" | "boolean" | "table" | "function" | "thread" | "userdata"

  function error(this: void, message: unknown, level?: number): never

  interface Control {
    SetHidden: (hidden: boolean) => undefined
  }

  interface SceneFragment {
    [key: string]: unknown
  }

  interface KeybindScrollbar {
    GetValue: () => number
    SetValue: (value: number) => undefined
  }

  interface KeybindTimeline {
    Stop: () => undefined
  }

  interface KeybindScrollListControl {
    scrollbar: KeybindScrollbar
    timeline: KeybindTimeline
  }

  interface KeybindingsSortFilterList {
    list: KeybindScrollListControl
    masterList: KeybindScrollEntry[]
    RefreshFilters: () => undefined
    FilterScrollList: (this: KeybindingsSortFilterList) => undefined
  }

  interface KeybindingManager {
    list: KeybindingsSortFilterList
  }

  interface ScrollListDataType {
    setupCallback: (this: void, control: object, data: object, list: object) => undefined
    hideCallback?: (this: void, control: object, data: object) => undefined
  }

  const KEYBOARD_KEYBINDING_MANAGER: KeybindingManager | undefined
  const KEYBINDING_MANAGER: KeybindingManager | undefined

  const KEYBOARD_OPTIONS: {
    currentPanelId: number
    panelNames: Record<number, string>
  }

  const ZO_KeybindingsList: object

  const ZO_ScrollList_GetDataTypeTable: (
    this: void,
    list: object,
    typeId: number
  ) => ScrollListDataType

  const ZO_ScrollList_GetDataList: (this: void, list: Control) => unknown
  const ZO_ScrollList_Clear: (this: void, list: object) => undefined

  const ZO_GameMenu_AddControlsPanel: (
    this: void,
    panel: {
      id: number
      name: string
      callback: (this: void) => undefined
      unselectedCallback: (this: void) => undefined
    }
  ) => undefined

  const ZO_GameMenu_InGame: {
    gameMenu: { navigationTree: Record<string, unknown> }
  }

  const ZO_PreHook: <T extends object>(
    this: void,
    target: T,
    methodName: string,
    hook: (this: void, ...args: never[]) => undefined
  ) => undefined

  const GAME_MENU_SCENE: {
    AddFragment: (this: void, fragment: SceneFragment) => undefined
    RemoveFragment: (this: void, fragment: SceneFragment) => undefined
  }

  const KEYBINDINGS_FRAGMENT: SceneFragment

  const CALLBACK_MANAGER: {
    FireCallbacks: (this: void, name: string, ...args: readonly unknown[]) => undefined
  }

  const EVENT_MANAGER: {
    RegisterForEvent: (
      this: void,
      name: string,
      event: number,
      callback: (this: void, eventCode: number, ...args: never[]) => undefined
    ) => undefined
    UnregisterForEvent: (this: void, name: string, event: number) => undefined
  }

  const EVENT_ADD_ON_LOADED: number

  const SafeAddString: (
    this: void,
    stringId: number,
    text: string,
    numOptionalArgs?: number
  ) => undefined

  const SI_GAME_MENU_KEYBINDINGS: number
  const SI_NONSTR_INGAMESHAREDSTRINGS_LAST_ENTRY: number
}

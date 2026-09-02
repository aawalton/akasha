import type { KeybindScrollEntry } from "../addon-keybinds-types/addon-keybinds-types.module.code.ts"

declare global {
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

  const KEYBINDINGS_FRAGMENT: SceneFragment

  const SafeAddString: (
    this: void,
    stringId: number,
    text: string,
    numOptionalArgs?: number
  ) => undefined

  const SI_GAME_MENU_KEYBINDINGS: number

  const SI_NONSTR_INGAMESHAREDSTRINGS_LAST_ENTRY: number
}

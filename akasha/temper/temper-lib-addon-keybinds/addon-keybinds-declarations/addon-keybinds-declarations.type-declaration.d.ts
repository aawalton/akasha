interface KeybindRowData {
  actionName: string
}

interface KeybindScrollEntry {
  typeId: number
  data?: KeybindRowData
}

interface KeybindScrollbar {
  GetValue: () => number
  SetValue: (value: number) => undefined
}

interface KeybindTimeline {
  Stop: () => undefined
}

interface KeybindScrollListControl extends Control {
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

declare const KEYBOARD_KEYBINDING_MANAGER: KeybindingManager | undefined

declare const KEYBINDING_MANAGER: KeybindingManager | undefined

declare const ZO_KeybindingsList: Control

declare const ZO_GameMenu_AddControlsPanel: (
  this: void,
  panel: {
    id: number
    name: string
    callback: (this: void) => undefined
    unselectedCallback: (this: void) => undefined
  }
) => undefined

declare const KEYBINDINGS_FRAGMENT: SceneFragment

declare const SI_GAME_MENU_KEYBINDINGS: number

declare const SI_NONSTR_INGAMESHAREDSTRINGS_LAST_ENTRY: number

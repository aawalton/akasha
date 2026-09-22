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

declare const SI_GAME_MENU_KEYBINDINGS: number

declare const SI_NONSTR_INGAMESHAREDSTRINGS_LAST_ENTRY: number

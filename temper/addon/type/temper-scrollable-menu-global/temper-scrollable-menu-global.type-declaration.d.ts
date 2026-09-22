type LsmEntryCallback = (
  this: void,
  comboBox?: unknown,
  itemName?: string,
  item?: unknown,
  checked?: boolean,
  data?: unknown
) => unknown

declare const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER: number

declare const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER: number

declare const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL: number

declare const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX: number

declare const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SUBMENU: number

declare const TemperScrollableMenuClear: (this: void, owner?: unknown) => undefined

declare var TemperScrollableMenuAddEntry: (
  this: void,
  text?: unknown,
  callback?: LsmEntryCallback,
  entryType?: unknown,
  entries?: unknown,
  additionalData?: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>

declare var TemperScrollableMenuAddHeader: (
  this: void,
  text?: unknown,
  additionalData?: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>

declare var TemperScrollableMenuAddSubMenuEntry: (
  this: void,
  text?: unknown,
  entries?: unknown,
  callbackFunc?: LsmEntryCallback,
  additionalData?: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>

declare var TemperScrollableMenuAddDivider: (
  this: void
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>

declare var TemperScrollableMenuShow: (
  this: void,
  controlToAnchorTo?: unknown,
  options?: unknown,
  specialCallbackData?: unknown
) => boolean

declare const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON: number

declare var TemperScrollableMenuAddCheckbox: (
  this: void,
  text?: unknown,
  callback?: LsmEntryCallback,
  checked?: unknown,
  additionalData?: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>

declare var TemperScrollableMenuAddRadioButton: (
  this: void,
  text?: unknown,
  callback?: LsmEntryCallback,
  checked?: unknown,
  buttonGroup?: unknown,
  additionalData?: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>

declare var TemperScrollableMenuAddComboBoxDropdown: (
  this: void,
  parent?: unknown,
  comboBoxContainer?: unknown,
  options?: unknown
) => unknown

declare var TemperScrollableMenu: Lib

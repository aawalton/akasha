type LsmEntryCallback = (
  this: void,
  comboBox?: unknown,
  itemName?: string,
  item?: unknown,
  checked?: boolean,
  data?: unknown
) => unknown

declare const LSM_ENTRY_TYPE_HEADER: number

declare const LSM_ENTRY_TYPE_DIVIDER: number

declare const LSM_ENTRY_TYPE_NORMAL: number

declare const LSM_ENTRY_TYPE_CHECKBOX: number

declare const LSM_ENTRY_TYPE_SUBMENU: number

declare const ClearCustomScrollableMenu: (this: void, owner?: unknown) => undefined

declare var AddCustomScrollableMenuEntry: (
  this: void,
  text?: unknown,
  callback?: LsmEntryCallback,
  entryType?: unknown,
  entries?: unknown,
  additionalData?: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>

declare var AddCustomScrollableMenuHeader: (
  this: void,
  text?: unknown,
  additionalData?: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>

declare var AddCustomScrollableSubMenuEntry: (
  this: void,
  text?: unknown,
  entries?: unknown,
  callbackFunc?: LsmEntryCallback,
  additionalData?: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>

declare var AddCustomScrollableMenuDivider: (
  this: void
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>

declare var ShowCustomScrollableMenu: (
  this: void,
  controlToAnchorTo?: unknown,
  options?: unknown,
  specialCallbackData?: unknown
) => boolean

declare const LSM_ENTRY_TYPE_RADIOBUTTON: number

declare var AddCustomScrollableMenuCheckbox: (
  this: void,
  text?: unknown,
  callback?: LsmEntryCallback,
  checked?: unknown,
  additionalData?: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>

declare var AddCustomScrollableMenuRadioButton: (
  this: void,
  text?: unknown,
  callback?: LsmEntryCallback,
  checked?: unknown,
  buttonGroup?: unknown,
  additionalData?: unknown
) => LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]>

declare var AddCustomScrollableComboBoxDropdownMenu: (
  this: void,
  parent?: unknown,
  comboBoxContainer?: unknown,
  options?: unknown
) => unknown

declare var LibScrollableMenu: Lib

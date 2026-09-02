declare const LSM_ENTRY_TYPE_HEADER: number

declare const LSM_ENTRY_TYPE_DIVIDER: number

declare const LSM_ENTRY_TYPE_NORMAL: number

declare const LSM_ENTRY_TYPE_CHECKBOX: number

declare const LSM_ENTRY_TYPE_SUBMENU: number

declare const ClearCustomScrollableMenu: (this: void, owner?: unknown) => undefined

declare const AddCustomScrollableMenuEntry: (
  this: void,
  text: string,
  callbackOrEntries?: ((this: void, ...args: unknown[]) => undefined) | readonly unknown[],
  entryType?: number,
  entries?: readonly unknown[],
  additionalData?: Record<string, unknown>
) => unknown

declare const AddCustomScrollableMenuHeader: (
  this: void,
  text: string,
  callbackOrEntries?: ((this: void, ...args: unknown[]) => undefined) | readonly unknown[],
  entryType?: number,
  entries?: readonly unknown[],
  additionalData?: Record<string, unknown>
) => unknown

declare const AddCustomScrollableSubMenuEntry: (
  this: void,
  text: string,
  entries: readonly unknown[],
  callback?: (this: void, ...args: unknown[]) => undefined
) => unknown

declare const AddCustomScrollableMenuDivider: (this: void) => undefined

declare const ShowCustomScrollableMenu: (this: void, owner?: unknown, options?: unknown) => unknown

declare const LSM_ENTRY_TYPE_RADIOBUTTON: number

declare const AddCustomScrollableMenuCheckbox: (
  this: void,
  text: string,
  callback: (
    this: void,
    comboBox: unknown,
    itemName: string,
    item: unknown,
    checked: boolean,
    data: unknown
  ) => void,
  checkedFn: (this: void) => boolean | undefined
) => unknown

declare const AddCustomScrollableMenuRadioButton: (
  this: void,
  text: string,
  callback: (
    this: void,
    comboBox: unknown,
    itemName: string,
    item: unknown,
    checked: boolean,
    data: unknown
  ) => void,
  checkedFn: (this: void) => boolean
) => unknown

declare const AddCustomScrollableComboBoxDropdownMenu: (
  this: void,
  parentControl: object,
  comboBoxContainer: object,
  options: { [key: string]: unknown }
) => unknown

declare const LibScrollableMenu: unknown

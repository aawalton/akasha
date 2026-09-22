interface SearchUIControl {
  GetName: (this: SearchUIControl) => string
  GetNamedChild: (this: SearchUIControl, name: string) => SearchUIControl
  GetParent: (this: SearchUIControl) => SearchUIControl
  GetOwningWindow: (this: SearchUIControl) => SearchUIControl
  IsHidden: (this: SearchUIControl) => boolean
  SetHidden: (this: SearchUIControl, hidden: boolean) => void
  SetAlpha: (this: SearchUIControl, alpha: number) => void
  SetText: (this: SearchUIControl, text: string) => void
  SetEnabled: (this: SearchUIControl, enabled: boolean) => void
  SetMouseEnabled: (this: SearchUIControl, enabled: boolean) => void
  SetHandler: (
    this: SearchUIControl,
    handlerName: string,
    handler: (this: void, ...args: unknown[]) => void
  ) => void
  ClearAnchors: (this: SearchUIControl) => void
  SetAnchor: (
    this: SearchUIControl,
    point: number,
    relativeTo?: SearchUIControl,
    relativePoint?: number,
    offsetX?: number,
    offsetY?: number
  ) => void
  SetDimensions: (this: SearchUIControl, x: number, y: number) => void
  SetDimensionConstraints: (
    this: SearchUIControl,
    minX: number,
    minY: number,
    maxX: number | string | undefined,
    maxY: number
  ) => void
  GetDimensions: (this: SearchUIControl) => LuaMultiReturn<[number, number]>
  GetWidth: (this: SearchUIControl) => number | undefined
  GetLeft: (this: SearchUIControl) => number
  GetTop: (this: SearchUIControl) => number
  BringWindowToTop: (this: SearchUIControl) => void
  AllowBringToTop: (this: SearchUIControl, allow: boolean) => void
  WasTruncated: (this: SearchUIControl) => boolean
  SetLink: (this: SearchUIControl, itemLink: string) => void
  [key: string]: unknown
}

interface SearchUIEditBox extends SearchUIControl {
  GetText: (this: SearchUIEditBox) => string
  SetDefaultText: (this: SearchUIEditBox, text: string) => void
}

interface SearchUIComboBoxItem {
  filterType?: number | string
  nameClean?: string
  releaseDateTimeStamp?: number
  tooltipText?: string
  label?: string
  name?: string
  m_data?: { tooltipText?: string; [key: string]: unknown }
  [key: string]: unknown
}

interface SearchUIComboBox {
  GetNumSelectedEntries: (this: SearchUIComboBox) => number
  GetNumItems: (this: SearchUIComboBox) => number
  ClearAllSelections: (this: SearchUIComboBox) => void
  ClearItems: (this: SearchUIComboBox) => void
  GetItems: (this: SearchUIComboBox) => SearchUIComboBoxItem[]
  SetSelected: (this: SearchUIComboBox, index: number, selected: boolean) => void
  IsItemSelected: (this: SearchUIComboBox, item: SearchUIComboBoxItem) => boolean
  IsDropdownVisible: (this: SearchUIComboBox) => boolean
  ShowDropdown: (this: SearchUIComboBox) => void
  GetIndexByEval: (
    this: SearchUIComboBox,
    evalFn: (this: void, item: SearchUIComboBoxItem) => boolean
  ) => number | undefined
  AddItemToSelected: (this: SearchUIComboBox, item: SearchUIComboBoxItem) => void
  CreateItemEntry: (this: SearchUIComboBox, name: string) => SearchUIComboBoxItem
  AddItem: (this: SearchUIComboBox, entry: SearchUIComboBoxItem, suppressUpdate?: unknown) => void
  UpdateItems: (this: SearchUIComboBox) => void
  SetSortsItems: (this: SearchUIComboBox, sorts: boolean) => void
  SetHideDropdownCallback: (this: SearchUIComboBox, callback: (this: void) => void) => void
  SetEntryMouseOverCallbacks: (
    this: SearchUIComboBox,
    enterCb: (this: void, comboBox: SearchUIComboBox, entry: SearchUIComboBoxItem) => void,
    exitCb: (this: void, comboBox: SearchUIComboBox, entry: SearchUIComboBoxItem) => void
  ) => void
  EnableMultiSelect: (
    this: SearchUIComboBox,
    selectedText: string | number,
    noSelectionText: string
  ) => void
  RefreshSelectedItemText: (this: SearchUIComboBox) => void
  m_sortedItems: SearchUIComboBoxItem[]
  m_sortOrder: boolean
  m_container?: SearchUIControl
  _sortFunc?: (this: void) => void
  [key: string]: unknown
}

interface ZoInitializingObjectSubclass {
  [key: string]: unknown
}

interface ZoInitializingObjectClass {
  Subclass: <T extends ZoInitializingObjectSubclass = ZoInitializingObjectSubclass>(
    this: ZoInitializingObjectClass
  ) => T
  New: <T = unknown>(this: void, self: object, ...args: unknown[]) => T
  Initialize: (this: void, self: object, ...args: unknown[]) => void
}

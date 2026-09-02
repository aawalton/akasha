interface SubmenuClass {
  [key: string]: unknown
  New: (this: SubmenuClass, ...args: unknown[]) => SubmenuObject
  Subclass: (this: SubmenuClass) => SubmenuClass

  Initialize: (
    this: SubmenuObject,
    parent: Control,
    comboBoxContainer: Control,
    options: LsmComboBoxOptions | undefined,
    depth: number
  ) => undefined
  UpdateOptions: (this: SubmenuObject, options?: LsmComboBoxOptions, onInit?: unknown) => undefined
  AddMenuItems: (this: SubmenuObject, parentControl: Control) => undefined
  GetEntries: (this: SubmenuObject) => unknown
  GetMaxRows: (this: SubmenuObject) => number
  GetMenuPrefix: (this: SubmenuObject) => string
  ShowDropdownInternal: (this: SubmenuObject) => undefined
  HideDropdownInternal: (this: SubmenuObject) => undefined
  HideDropdown: (this: SubmenuObject) => boolean
  HideOnMouseExit: (this: SubmenuObject, mocCtrl?: LsmMocControl) => boolean | undefined
  ShouldHideDropdown: (this: SubmenuObject) => boolean
  IsMouseOverOpeningControl: (this: SubmenuObject) => boolean
  GetHiddenForReasons: (
    this: SubmenuObject,
    button: number
  ) => (
    this: void,
    owningWindow: unknown,
    mocCtrl: unknown,
    comboBox: unknown,
    entry: unknown
  ) => unknown
}

interface SubmenuObject {
  isSubmenu?: unknown
  m_parentMenu?: Control
  breadcrumbName?: string
  openingControl?: unknown
  visibleRowsSubmenu?: number
  onHideDropdownCallback?: unknown

  GetMenuPrefix: (this: SubmenuObject) => string
  ShowDropdownInternal: (this: SubmenuObject) => undefined
  HideDropdownInternal: (this: SubmenuObject) => undefined
  HideOnMouseExit: (this: SubmenuObject, mocCtrl?: LsmMocControl) => boolean | undefined
  IsMouseOverOpeningControl: (this: SubmenuObject) => boolean
}

interface SubmenuProxyObject {
  m_comboBox?: ComboBoxObject
  __parentClasses?: unknown[]
  [key: string]: unknown
}

interface LsmMocControl extends Control {
  m_dropdownObject?: unknown
  [key: string]: unknown
}

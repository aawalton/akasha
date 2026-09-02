declare const SI_LSM_SLIDER_CURRENT_MIN_MAX_STEP: number

interface ZoComboBoxBaseClass {
  AddItem: (
    this: void,
    self: ComboBoxBase,
    itemEntry: unknown,
    updateOptions?: unknown
  ) => undefined
  HideDropdown: (this: void, self: ComboBoxBase) => undefined
  UpdateItems: (this: void, self: ComboBoxBase) => undefined
  [key: string]: unknown
}
declare const ZO_ComboBox_Base: ZoComboBoxBaseClass

interface ScreenNarrationManagerLike {
  CreateNarratableObject: (this: ScreenNarrationManagerLike, text: string) => unknown
  RegisterCustomObject: (this: ScreenNarrationManagerLike, name: string, data: unknown) => undefined
  QueueCustomEntry: (this: ScreenNarrationManagerLike, name: string) => undefined
  [key: string]: unknown
}

interface ComboBoxBaseClass {
  [key: string]: unknown
  New: (this: ComboBoxBaseClass, ...args: unknown[]) => ComboBoxBase
  Subclass: (this: ComboBoxBaseClass) => ComboBoxBaseClass
}

interface ZoComboBoxInstance {
  GetDropdownFont: (this: ZoComboBoxInstance) => string
  GetItemNormalColor: (this: ZoComboBoxInstance, data: unknown) => ZoColorDef
  IsDropdownVisible: (this: ZoComboBoxInstance) => boolean
  IsEnabled: (this: ZoComboBoxInstance) => boolean
  SetHeight: (this: ZoComboBoxInstance, height: number) => undefined
  ShowDropdown: (this: ZoComboBoxInstance) => undefined
  ShowDropdownOnMouseUp: (this: ZoComboBoxInstance) => undefined
}

interface ComboBoxBase {
  m_sortedItems?: unknown[]
  m_unsortedItems?: unknown[]
  m_container?: Control
  m_dropdownObject: DropdownObject
  m_submenu?: ComboBoxBase
  m_nextFree?: number
  m_customEntryTemplateInfos?: Record<string, unknown>
  m_selectedItemData?: unknown
  m_sortOrder?: unknown
  m_sortsItems?: unknown
  m_LSMsortKey?: unknown
  m_sortType?: unknown
  m_LSMsortButtonData?: unknown
  m_enableMultiSelect?: unknown
  m_maxNumSelections?: unknown
  m_spacing?: number
  m_height?: number
  m_containerWidth?: number
  m_highlightTemplate?: unknown
  m_buttonGroup?: Record<string, unknown>
  m_scroll?: unknown
  XMLRowTemplates?: Record<number, LsmTemplateData>
  XMLRowHighlightTemplates?: Record<number, Record<string, unknown>>
  baseEntryHeight?: number
  containerMinWidth?: number
  maxHeight?: number
  maxWidth?: number
  minWidth?: number
  highlightContextMenuOpeningControl?: unknown
  highlightedControl?: unknown
  horizontalAlignment?: unknown
  narrateData?: Record<string, unknown>
  dontSetSelectedTextOnSelection?: unknown
  onSelectionBlockedCallback?: (this: void, item: unknown) => unknown
  isSubmenu?: unknown
  owner?: unknown
  options?: LsmComboBoxOptions

  Initialize: (
    this: ComboBoxBase,
    parent: Control,
    comboBoxContainer: Control,
    options: LsmComboBoxOptions | undefined,
    depth: number,
    initExistingComboBox?: unknown
  ) => undefined
  AddItem: (
    this: ComboBoxBase,
    itemEntry: unknown,
    updateOptions?: unknown,
    templates?: unknown
  ) => undefined
  AddCustomEntryTemplate: (
    this: ComboBoxBase,
    entryTemplate: unknown,
    entryHeight: unknown,
    setupFunction: unknown,
    widthPadding?: unknown
  ) => undefined
  GetItemFontObject: (this: ComboBoxBase, item: LsmEntry) => unknown
  AddCustomEntryTemplates: (
    this: ComboBoxBase,
    options: LsmComboBoxOptions | undefined,
    isContextMenu?: unknown
  ) => undefined
  OnGlobalMouseUp: (this: ComboBoxBase, eventId: number, button: number) => boolean | undefined
  GetBaseHeight: (this: ComboBoxBase, control: Control) => number
  GetBaseWidth: (this: ComboBoxBase, control: Control | undefined) => number
  GetMaxDropdownHeight: (this: ComboBoxBase) => number | undefined
  GetMaxDropdownWidth: (this: ComboBoxBase) => number | undefined
  GetMinDropdownWidth: (this: ComboBoxBase) => number | undefined
  GetDropdownObject: (
    this: ComboBoxBase,
    comboBoxContainer: Control,
    depth: number
  ) => DropdownObject
  GetOptions: (this: ComboBoxBase) => LsmComboBoxOptions
  GetSubmenu: (this: ComboBoxBase) => ComboBoxBase
  HiddenForReasons: (
    this: ComboBoxBase,
    button: number,
    isMouseOverOwningDropdown: unknown
  ) => unknown
  GetHighlightTemplate: (this: ComboBoxBase, control: Control | undefined) => unknown
  GetHighlightTemplateData: (
    this: ComboBoxBase,
    control: Control,
    m_data: unknown,
    isSubMenu: unknown,
    isContextMenu: unknown
  ) => Record<string, unknown> | undefined
  UpdateHighlightTemplate: (
    this: ComboBoxBase,
    control: Control,
    data: unknown,
    isSubMenu: unknown,
    isContextMenu: unknown
  ) => undefined
  HideDropdown: (this: ComboBoxBase) => boolean
  IsMouseOverControl: (this: ComboBoxBase) => boolean
  Narrate: (
    this: ComboBoxBase,
    eventName: string | undefined,
    ctrl: Control,
    data: unknown,
    hasSubmenu: unknown,
    anchorPoint?: unknown
  ) => undefined
  RefreshSortedItems: (this: unknown, parentControl: Control) => undefined
  RunItemCallback: (
    this: ComboBoxBase,
    item: LsmEntry,
    ignoreCallback: unknown,
    ...args: unknown[]
  ) => unknown
  SetOptions: (this: ComboBoxBase, options: LsmComboBoxOptions | undefined) => undefined
  Show: (this: ComboBoxBase) => undefined
  ShowDropdownOnMouseAction: (this: ComboBoxBase, parentControl: Control) => undefined
  ShowSubmenu: (this: ComboBoxBase, parentControl: Control) => undefined
  ShouldHideDropdown: (this: ComboBoxBase) => boolean
  SetSortData: (this: ComboBoxBase) => undefined
  GetCustomSortButtonData: (this: ComboBoxBase) => undefined
  ApplyCustomSortButtonData: (
    this: ComboBoxBase,
    buttonControl: Control,
    buttonData: Record<string, unknown>,
    sortContainer: Control,
    headerControl: Control
  ) => boolean
  ApplyCustomSortButtonsData: (
    this: ComboBoxBase,
    headerControl: Control,
    control: Control
  ) => boolean
  UpdateItems: (this: ComboBoxBase, sortUpdate?: unknown) => undefined
  UpdateHeight: (this: ComboBoxBase, control?: Control) => undefined
  SetMinMaxWidth: (this: ComboBoxBase, minWidth: number, maxWidth: number) => undefined
  UpdateWidth: (this: ComboBoxBase, control?: Control) => undefined
  SetupEntryBase: (this: ComboBoxBase, control: Control, data: LsmEntry, list: unknown) => undefined
  SetupEntryLabelBase: (
    this: ComboBoxBase,
    control: Control,
    data: LsmEntry,
    list: unknown
  ) => undefined
  SetupEntryLabel: (
    this: ComboBoxBase,
    control: Control,
    data: LsmEntry,
    list: unknown,
    realEntryType?: number
  ) => undefined
  SetupEntryDivider: (
    this: ComboBoxBase,
    control: Control,
    data: LsmEntry,
    list: unknown
  ) => undefined
  SetupEntryHeader: (
    this: ComboBoxBase,
    control: Control,
    data: LsmEntry,
    list: unknown
  ) => undefined
  SetupEntrySubmenu: (
    this: ComboBoxBase,
    control: Control,
    data: LsmEntry,
    list: unknown
  ) => undefined
  SetupEntryRadioButton: (
    this: ComboBoxBase,
    control: Control,
    data: LsmEntry,
    list: unknown
  ) => undefined
  SetupEntryCheckbox: (
    this: ComboBoxBase,
    control: Control,
    data: LsmEntry,
    list: unknown
  ) => undefined
  SetupEntryButton: (
    this: ComboBoxBase,
    control: Control,
    data: LsmEntry,
    list: unknown
  ) => undefined
  SetupEntryEditBox: (
    this: ComboBoxBase,
    control: Control,
    data: LsmEntry,
    list: unknown
  ) => undefined
  SetupEntrySlider: (
    this: ComboBoxBase,
    control: Control,
    data: LsmEntry,
    list: unknown
  ) => undefined
  CheckIfNoEntryFoundWasClicked: (this: ComboBoxBase, item: LsmEntry) => boolean
  ItemSelectedClickHelper: (this: ComboBoxBase, item: LsmEntry, ignoreCallback: unknown) => boolean
  SelectItem: (
    this: ComboBoxBase,
    item: LsmEntry | undefined,
    ignoreCallback: unknown
  ) => boolean | undefined
  SetSelected: (this: ComboBoxBase, index: number, ignoreCallback: unknown) => undefined
  GetFilterFunction: (this: ComboBoxBase) => unknown
  GetSortData: (
    this: ComboBoxBase
  ) => LuaMultiReturn<[unknown, unknown, unknown, unknown, unknown, unknown]>
  GetMaxRows: (this: ComboBoxBase) => number | undefined
  IsFilterEnabled: (this: ComboBoxBase) => unknown
  IsSortEnabled: (this: ComboBoxBase) => unknown
  UpdateOptions: (
    this: ComboBoxBase,
    options: LsmComboBoxOptions | undefined,
    onInit?: unknown,
    isContextMenu?: unknown,
    initExistingComboBox?: unknown
  ) => undefined
  SetFilterString: (this: ComboBoxBase) => undefined
  SetupDropdownHeader: (this: ComboBoxBase) => undefined
  UpdateDropdownHeader: (this: ComboBoxBase) => undefined

  AddMenuItems: (this: unknown, parentControl: Control) => undefined
  GetHiddenForReasons: (
    this: ComboBoxBase,
    button: number
  ) => ((...args: unknown[]) => unknown) | undefined
}

interface LsmRowControl
  extends Omit<
    Control,
    | "ClearAnchors"
    | "GetHandler"
    | "GetHeight"
    | "GetNamedChild"
    | "GetParent"
    | "GetWidth"
    | "SetAnchor"
    | "SetDimensionConstraints"
    | "SetDimensions"
    | "SetHandler"
    | "SetHidden"
    | "SetMouseEnabled"
    | "SetWidth"
  > {
  m_label?: LsmRowControl
  m_icon?: LsmMultiIconControl
  m_iconContainer?: LsmRowControl
  m_arrow?: LsmRowControl
  m_button?: LsmRowControl
  m_divider?: LsmRowControl
  m_data?: Record<string, unknown>
  m_owner?: ComboBoxBase
  typeId?: number
  header?: LsmRowControl
  editBoxData?: Record<string, unknown>
  sliderData?: Record<string, unknown>
  callback?: unknown
  contextMenuCallback?: unknown
  closeOnSelect?: unknown
  selectable?: unknown
  rowControl?: LsmRowControl
  onMouseUpFunc?: unknown
  isDivider?: unknown
  isHeader?: unknown
  isRadioButton?: unknown
  isCheckbox?: unknown
  isButton?: unknown
  isEditBox?: unknown
  isSlider?: unknown
  entryType?: number
  enabled?: unknown
  GetParent: () => LsmRowControl
  GetNamedChild: (name: string) => LsmRowControl
  IsEnabled: (this: LsmRowControl) => boolean
  SetTextType: (this: LsmRowControl, textType: number) => undefined
  SetMinMax: (this: LsmRowControl, min: number, max: number) => undefined
  SetValue: (this: LsmRowControl, value: number) => undefined
  SetValueStep: (this: LsmRowControl, step: number) => undefined
  GetValue: (this: LsmRowControl) => number
  GetMinMax: (this: LsmRowControl) => LuaMultiReturn<[number, number]>
  GetValueStep: (this: LsmRowControl) => number
  SetOrientation: (this: LsmRowControl, orientation: number) => undefined
  SetText: (this: LsmRowControl, text: string) => undefined
  SetFont: (this: LsmRowControl, font: string) => undefined
  SetColor: (this: LsmRowControl, r: number, g: number, b: number, a: number) => undefined
  SetHorizontalAlignment: (this: LsmRowControl, alignment: number) => undefined
  SetHidden: (hidden: boolean) => undefined
  SetMouseEnabled: (enabled: boolean) => undefined
  SetEnabled: (this: LsmRowControl, enabled: unknown) => undefined
  SetWidth: (width: number | string) => undefined
  SetDimensions: (width: number | string, height: number | string) => undefined
  SetDimensionConstraints: (minW: number, minH: number, maxW?: number, maxH?: number) => undefined
  ClearAnchors: () => undefined
  SetAnchor: (
    pointOnMe: number,
    target?: unknown,
    pointOnTarget?: number,
    offsetX?: number,
    offsetY?: number
  ) => undefined
  GetHeight: () => number
  GetWidth: () => number
  SetHandler: (event: string, handler: unknown) => undefined
  GetHandler: (event: string) => ((this: void, ...args: unknown[]) => undefined) | undefined
  SetDefaultText: (this: LsmRowControl, text: string) => undefined
  SetMaxInputChars: (this: LsmRowControl, maxChars: number) => undefined
  [key: string]: unknown
}

interface LsmMultiIconControl
  extends Omit<
    Control,
    | "GetHandler"
    | "GetParent"
    | "SetDimensions"
    | "SetDrawLayer"
    | "SetDrawLevel"
    | "SetDrawTier"
    | "SetHandler"
    | "SetHidden"
    | "SetMouseEnabled"
  > {
  data?: Record<string, unknown>
  AddIcon: (
    this: LsmMultiIconControl,
    texture: unknown,
    tint: unknown,
    narration: unknown
  ) => undefined
  ClearIcons: (this: LsmMultiIconControl) => undefined
  SetDrawTier: (tier: number) => undefined
  SetDrawLayer: (layer: number) => undefined
  SetDrawLevel: (level: number) => undefined
  Show: (this: LsmMultiIconControl) => undefined
  SetHidden: (hidden: boolean) => undefined
  SetMouseEnabled: (enabled: boolean) => undefined
  SetDimensions: (width: number, height: number) => undefined
  GetHandler: (event: string) => ((...args: unknown[]) => undefined) | undefined
  SetHandler: (event: string, handler: ((...args: unknown[]) => undefined) | undefined) => undefined
  GetParent: () => LsmRowControl
  [key: string]: unknown
}

interface LsmSortButtonControl
  extends Omit<
    Control,
    | "ClearAnchors"
    | "GetNamedChild"
    | "GetWidth"
    | "SetAnchor"
    | "SetDimensions"
    | "SetHeight"
    | "SetWidth"
  > {
  SetNormalTexture: (this: LsmSortButtonControl, texture: string) => undefined
  SetPressedTexture: (this: LsmSortButtonControl, texture: string) => undefined
  SetMouseOverTexture: (this: LsmSortButtonControl, texture: string) => undefined
  SetDisabledTexture: (this: LsmSortButtonControl, texture: string) => undefined
  SetWidth: (width: number) => undefined
  SetHeight: (height: number) => undefined
  ClearAnchors: () => undefined
  SetAnchor: (
    pointOnMe: number,
    target: unknown,
    pointOnTarget: number,
    offsetX: number,
    offsetY: number
  ) => undefined
  GetWidth: () => number
  SetDimensions: (width: number, height: number | string) => undefined
  GetNamedChild: (name: string) => LsmSortButtonControl | undefined
  [key: string]: unknown
}

interface DropdownAddTemplate {
  AddCustomEntryTemplate: (
    this: DropdownAddTemplate,
    entryTemplate: unknown,
    entryHeight: unknown,
    setupFunction: unknown,
    widthPadding?: unknown
  ) => undefined
}

interface LsmTemplateData {
  template?: unknown
  rowHeight?: unknown
  widthPadding?: unknown
  setupFunc?: unknown
  [key: string]: unknown
}

interface LsmDebug {
  doDebug: boolean
  doVerboseDebug: boolean
  controlNameCache: Record<string, unknown>
  prefix: string
  loggerTypeToName: Record<number, string>
  LSM_LOGTYPE_DEBUG: number
  LSM_LOGTYPE_VERBOSE: number
  LSM_LOGTYPE_DEBUG_CALLBACK: number
  LSM_LOGTYPE_INFO: number
  LSM_LOGTYPE_ERROR: number
  DebugLog?: (this: void, ...args: unknown[]) => void
  LoadLogger?: (this: void, ...args: unknown[]) => void
  debugLoggingToggle?: (this: void, ...args: unknown[]) => void
  [key: string]: unknown
}

interface LsmSVConstants {
  name: string
  version: number
  profile: string
  defaults: Record<string, unknown>
}

interface LsmConstants {
  NIL_CHECK_TABLE: Record<string, unknown>
  throttledCallDelay: number
  handlerNames: Record<string, string>
  comboBox: Record<string, unknown>
  dropdown: Record<string, unknown>
  submenu: Record<string, unknown>
  entryTypes: Record<string, unknown>
  fonts: Record<string, string>
  colors: Record<string, unknown>
  textures: Record<string, unknown>
  narration: Record<string, unknown>
  data: Record<string, unknown>
  searchFilter: Record<string, unknown>
  sounds: Record<string, unknown>
  [key: string]: unknown
}

interface Lib extends ZoCallbackObjectInstance {
  name: string
  author: string
  version: string
  _objects: Record<string, unknown>
  preventerVars: Record<string, unknown>
  XML: Record<string, unknown>
  contextMenuCallbacksRegistered: Record<string, unknown>
  constants: LsmConstants
  Debug: LsmDebug
  SVConstans: LsmSVConstants
  SV: Record<string, unknown>
  classes: Record<string, unknown>
  Util: Record<string, unknown>
  DIVIDER: string
  AllowedEntryTypes: Record<number, boolean>
  AllowedEntryTypesForContextMenu: Record<number, boolean>
  scrollListRowTypes: Record<string, number>
  scrollListRowHighlights: Record<string, string>
  [key: string]: unknown
}

interface LsmEntry {
  [key: string]: unknown
}
interface LsmComboBoxOptions {
  [key: string]: unknown
}

interface ComboBoxBase extends ZoComboBoxInstance {
  m_comboBox?: unknown
  updatedOptions?: Record<string, unknown>
  isContextMenu?: boolean
}

interface ComboBoxObject extends ComboBoxBase {}

interface SubmenuObject extends ComboBoxBase {
  m_comboBox?: ComboBoxObject
}

interface ContextMenuObject extends ComboBoxObject {}

interface DropdownObject extends ZoComboBoxDropdownKeyboardInstance {
  owner?: ComboBoxBase
  m_comboBox?: ComboBoxBase
}

interface ButtonGroupObject extends ZoRadioButtonGroupInstance {}

interface AnchorObject {
  anchor: ZoAnchor
  [key: string]: unknown
}

interface AnchorObject {
  targetId?: number
  New: (
    this: AnchorObject,
    pointOnMe: number,
    targetId: number | undefined,
    pointOnTarget: number,
    offsetX: number,
    offsetY: number
  ) => AnchorObject
}

interface ButtonGroupObject {
  m_clickedButton?: ButtonGroupButton
  m_enabled?: unknown
  labelColorEnabled: ZoColorDef
  labelColorDisabled: ZoColorDef
  customClickHandler?: (
    this: void,
    control: ButtonGroupButton,
    buttonId: unknown,
    ignoreCallback: unknown
  ) => unknown
  onSelectionChangedCallback?: (
    this: ButtonGroupObject,
    control: ButtonGroupButton,
    previousControl: ButtonGroupButton | undefined
  ) => undefined
  onStateChangedCallback?: (
    this: ButtonGroupObject,
    control: ButtonGroupButton,
    updatedButtons: ButtonGroupButton[]
  ) => undefined

  Add: (
    this: ButtonGroupObject,
    button: ButtonGroupButton | undefined,
    entryType: unknown
  ) => boolean | undefined
  Remove: (this: ButtonGroupObject, button: ButtonGroupButton) => undefined
  SetButtonState: (
    this: ButtonGroupObject,
    button: ButtonGroupButton,
    clickedButton: ButtonGroupButton | undefined,
    enabled: unknown,
    ignoreCallback?: unknown
  ) => undefined
  HandleClick: (
    this: ButtonGroupObject,
    control: ButtonGroupButton,
    buttonId: unknown,
    ignoreCallback: unknown
  ) => undefined
  SetChecked: (
    this: ButtonGroupObject,
    control: ButtonGroupButton,
    checked: boolean | undefined,
    ignoreCallback: unknown
  ) => boolean
  SetInverse: (
    this: ButtonGroupObject,
    control: ButtonGroupButton,
    ignoreCallback: unknown
  ) => boolean
  SetStateChangedCallback: (this: ButtonGroupObject, callback: unknown) => undefined
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

interface ComboBoxObject {
  visibleRows?: number
  m_name?: string
  m_openDropdown?: unknown
  m_selectedItemText?: unknown
  m_preshowDropdownFn?: unknown
  filterString?: string
  defaults?: Record<string, unknown>
  optionsChanged?: unknown
  updatedOptions?: Record<string, unknown>

  AddMenuItems: (this: unknown) => undefined

  UpdateMetatable: (
    this: ComboBoxObject,
    parent: Control,
    comboBoxContainer: Control,
    options: LsmComboBoxOptions | undefined
  ) => undefined
  GetUniqueName: (this: ComboBoxObject) => string | undefined
  GetMenuPrefix: (this: ComboBoxObject) => string
  GetSubMenuOpeningSide: (this: ComboBoxObject) => string | undefined
  HideOnMouseEnter: (this: ComboBoxObject) => undefined
  HideOnMouseExit: (this: ComboBoxObject, mocCtrl?: unknown) => boolean | undefined
  IsAutomaticRefreshEnabled: (
    this: ComboBoxObject
  ) => LuaMultiReturn<[unknown, unknown]> | undefined
  SetDefaults: (this: ComboBoxObject) => undefined
  ResetToDefaults: (this: ComboBoxObject, initExistingComboBox?: unknown) => undefined
  SetOption: (this: ComboBoxObject, LSMOptionsKey: string, doDebugNow?: boolean) => undefined
  UpdateResults: (this: ComboBoxObject, comingFromFilters?: unknown) => undefined
  ShowDropdownInternal: (this: ComboBoxObject) => undefined
}

interface ContextMenuObject {
  data?: unknown[]
  contextMenuOptions?: LsmComboBoxOptions
  contextMenuIssuingControl?: unknown
  openingControl?: Control
  m_dropdown?: ContextMenuDropdown
  m_name?: string
  m_selectedItemData?: unknown
  optionsChanged?: unknown

  RefreshSortedItems: (this: unknown) => undefined

  AddContextMenuItem: (this: ContextMenuObject, itemEntry: unknown) => number
  HighlightOpeningControl: (this: ContextMenuObject) => undefined
  SetContextMenuOptions: (this: ContextMenuObject, options?: LsmComboBoxOptions) => undefined
  ClearItems: (this: ContextMenuObject) => undefined
  ShowContextMenu: (this: ContextMenuObject, parentControl?: Control) => undefined
  RegisterSpecialCallback: (
    this: ContextMenuObject,
    uniqueAddonName?: string,
    callbackName?: string,
    specialCallbackData?: Record<string, unknown>
  ) => boolean
  UnregisterSpecialCallback: (
    this: ContextMenuObject,
    uniqueAddonName?: string,
    callbackName?: string
  ) => boolean | undefined
  RunSpecialCallback: (this: ContextMenuObject, callbackName?: string) => unknown
}

interface DropdownObject {
  control?: DropdownRowControl
  scrollControl?: DropdownScrollControl
  scroll?: unknown
  spacing?: number
  nextScrollTypeId?: number
  m_container?: unknown
  m_parentMenu?: DropdownObject
  m_submenu?: DropdownObject
  m_sortedItems?: unknown[]
  anchorRight?: boolean
  customEntryTemplateInfos?: Record<
    string,
    { typeId: number; entryHeight: number; widthPadding?: number }
  >
  wasTextSearchContextMenuEntryClicked?: unknown

  Initialize: (
    this: DropdownObject,
    comboBoxObject: DropdownComboBox,
    comboBoxContainer: Control,
    depth: number
  ) => undefined
  AddItems: (this: DropdownObject, items: unknown) => undefined
  AddItem: (this: DropdownObject, item: unknown) => undefined
  Narrate: (
    this: DropdownObject,
    eventName: string,
    ctrl: unknown,
    data?: unknown,
    hasSubmenu?: unknown,
    anchorPoint?: unknown
  ) => undefined
  GetFormattedNarrateEvent: (this: DropdownObject, suffix: string) => string
  SetupScrollList: (this: DropdownObject) => undefined
  AddCustomEntryTemplate: (
    this: DropdownObject,
    entryTemplate: string,
    entryHeight: number,
    setupFunction: unknown,
    widthPadding?: number
  ) => undefined
  GetSubMenuOpeningSide: (this: DropdownObject) => unknown
  AnchorToControl: (this: DropdownObject, parentControl: DropdownRowControl) => undefined
  AnchorToComboBox: (this: DropdownObject, comboBox: unknown) => undefined
  AnchorToMouse: (this: DropdownObject) => undefined
  GetSubmenu: (this: DropdownObject) => DropdownObject | undefined
  IsDropdownVisible: (this: DropdownObject) => boolean
  IsEnteringSubmenu: (this: DropdownObject) => boolean
  IsItemSelected: (this: DropdownObject, item: unknown) => boolean
  IsMouseOverOpeningControl: (this: DropdownObject) => boolean
  OnMouseEnterEntry: (this: DropdownObject, control: DropdownRowControl) => undefined
  OnMouseExitEntry: (this: DropdownObject, control: DropdownRowControl) => undefined
  OnMouseExitTimeout: (this: DropdownObject, control: unknown) => undefined
  OnEntrySelected: (this: DropdownObject, control: DropdownRowControl) => undefined
  OnEntryMouseUp: (
    this: DropdownObject,
    control: DropdownRowControl,
    button: number,
    upInside: boolean,
    ignoreHandler?: unknown,
    ctrl?: unknown,
    alt?: unknown,
    shift?: unknown,
    lsmEntryType?: number
  ) => undefined
  SelectItemByIndex: (this: DropdownObject, index: number, ignoreCallback?: unknown) => unknown
  RunItemCallback: (
    this: DropdownObject,
    item: { entryType?: number; [key: string]: unknown },
    ignoreCallback?: unknown
  ) => unknown
  UpdateHeight: (this: DropdownObject) => undefined
  UpdateWidth: (this: DropdownObject) => undefined
  OnShow: (this: DropdownObject, formattedEventName?: string) => undefined
  OnHide: (this: DropdownObject, formattedEventName?: string) => undefined
  Show: (
    this: DropdownObject,
    comboBox: DropdownComboBox,
    itemTable: unknown[],
    minWidth: number,
    maxWidth: number,
    maxHeight: number,
    spacing: number
  ) => undefined
  ShowSubmenu: (this: DropdownObject, control: unknown) => undefined
  ShowTooltip: (
    this: DropdownObject,
    control: unknown,
    data: { hasSubmenu?: unknown; [key: string]: unknown }
  ) => undefined
  HideDropdown: (this: DropdownObject) => undefined
  IsAutomaticRefreshEnabled: (this: DropdownObject) => LuaMultiReturn<[unknown, unknown]>
  SubmenuOrCurrentListRefresh: (
    this: DropdownObject,
    control: unknown,
    override?: unknown,
    refreshMainMenuOrSubmenu?: unknown
  ) => unknown
  Refresh: (
    this: DropdownObject,
    item?: { m_owner?: { m_scroll?: Control }; [key: string]: unknown }
  ) => undefined
  XMLHandler: (this: DropdownObject, selfVar: unknown, handlerName: string) => undefined
  WasTextSearchContextMenuEntryClicked: (
    this: DropdownObject,
    mocCtrl: DropdownRowControl | undefined
  ) => boolean
  SetFilterString: (this: DropdownObject, filterBox: DropdownRowControl) => undefined
  ShowFilterEditBoxHistory: (this: DropdownObject, filterBox: DropdownRowControl) => undefined
  OnFilterEditBoxMouseUp: (
    this: DropdownObject,
    filterBox: DropdownRowControl,
    button: number,
    upInside: boolean,
    ctrl?: unknown,
    alt?: unknown,
    shift?: unknown
  ) => undefined
  ResetFilters: (
    this: DropdownObject,
    owningWindow: { filterBox?: DropdownRowControl } | undefined
  ) => undefined
  IsFilterEnabled: (this: DropdownObject) => unknown
  Sort: (this: DropdownObject, owningWindow: unknown, sortUp?: boolean) => undefined
  IsSortEnabled: (this: DropdownObject) => unknown
  ApplyCustomSortButtonsData: (this: DropdownObject) => unknown
  ShowTextTooltip: (
    this: DropdownObject,
    control: DropdownRowControl,
    side: unknown,
    tooltipText: unknown,
    owningWindow?: { filterBox?: DropdownRowControl }
  ) => undefined
  OnEditBoxTextChanged: (this: DropdownObject, editBox: DropdownRowControl) => undefined
  OnSliderValueChanged: (this: DropdownObject, slider: DropdownRowControl) => undefined
  ToggleHeader: (this: DropdownObject, toggleButtonControl: Control) => undefined
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

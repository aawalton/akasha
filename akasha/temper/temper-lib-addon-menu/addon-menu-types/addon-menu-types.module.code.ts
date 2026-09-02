export type Valued<T> = T | ((this: void) => T)

export interface LamWidgetData {
  type: string
  name?: Valued<string | number>
  reference?: string
  width?: "full" | "half"
  tooltip?: Valued<string | number>
  tooltipText?: string | number
  warning?: Valued<string | number>
  requiresReload?: boolean
  disabled?: Valued<boolean>
  helpUrl?: Valued<string>
  default?: unknown
  resetFunc?: (this: void, control: LamControl) => void
  getFunc?: (this: void) => unknown
  setFunc?: (this: void, ...args: unknown[]) => void
  registerForRefresh?: boolean
  registerForDefaults?: boolean
  controls?: LamWidgetData[]
}

interface LamValueWidgetData extends LamWidgetData {
  getFunc: (this: void) => unknown
  setFunc: (this: void, ...args: unknown[]) => void
}

export interface PanelData extends LamWidgetData {
  type: "panel"
  name: Valued<string | number>
  displayName?: Valued<string | number>
  author?: Valued<string | number>
  version?: Valued<string | number>
  website?: Valued<string>
  feedback?: Valued<string>
  translation?: Valued<string>
  donation?: Valued<string>
  keywords?: string
  slashCommand?: string
  registerForRefresh?: boolean
  registerForDefaults?: boolean
}

export interface ButtonData extends LamWidgetData {
  type: "button"
  name: Valued<string | number>
  func: (this: void, ...args: unknown[]) => void
  icon?: string
  isDangerous?: boolean
}

export interface CheckboxData extends LamValueWidgetData {
  type: "checkbox"
  name: Valued<string | number>
  getFunc: (this: void) => boolean
}

export interface ColorpickerData extends LamValueWidgetData {
  type: "colorpicker"
  name: Valued<string | number>
  getFunc: (this: void) => LuaMultiReturn<[number, number, number, (number | undefined)?]>
}

export interface CustomData extends LamWidgetData {
  type: "custom"
  createFunc?: (this: void, control: LamControl) => void
  refreshFunc?: (this: void, control: LamControl) => void
  minHeight?: Valued<number>
  maxHeight?: Valued<number>
}

export interface DescriptionData extends LamWidgetData {
  type: "description"
  text: Valued<string | number>
  title?: Valued<string | number>
  enableLinks?: boolean | ((this: void, ...args: unknown[]) => void)
}

export interface DividerData extends LamWidgetData {
  type: "divider"
  height?: number
  alpha?: number
}

export interface DropdownData extends LamValueWidgetData {
  type: "dropdown"
  name: Valued<string | number>
  choices: string[]
  choicesValues?: unknown[]
  choicesTooltips?: Valued<string | number>[]
  sort?: string
  scrollable?: boolean | number
  multiSelect?: Valued<boolean>
  multiSelectTextFormatter?: Valued<string | number>
  multiSelectNoSelectionText?: Valued<string | number>
  multiSelectMaxSelections?: Valued<number>
}

export interface EditboxData extends LamValueWidgetData {
  type: "editbox"
  name: Valued<string | number>
  isMultiline?: boolean
  isExtraWide?: boolean
  maxChars?: Valued<number>
  textType?: Valued<number>
}

export interface HeaderData extends LamWidgetData {
  type: "header"
  name: Valued<string | number>
}

export interface IconpickerData extends LamValueWidgetData {
  type: "iconpicker"
  name: Valued<string | number>
  choices: string[]
  choicesTooltips?: Valued<string | number>[]
  maxColumns?: number
  visibleRows?: number
  iconSize?: number
  defaultColor?: ZoColorDef
  beforeShow?: (this: void, control: LamControl, iconPicker: IconPickerMenu) => boolean
}

export interface SliderData extends LamValueWidgetData {
  type: "slider"
  name: Valued<string | number>
  min: number
  max: number
  step?: number
  clampInput?: boolean
  clampFunction?: (this: void, value: number, min: number, max: number) => number
  decimals?: number
  autoSelect?: boolean
  inputLocation?: "below" | "right"
  readOnly?: boolean
}

export interface SubmenuData extends LamWidgetData {
  type: "submenu"
  name: Valued<string | number>
  icon?: Valued<string>
  iconTextureCoords?: Valued<[number, number, number, number]>
  disabledLabel?: Valued<boolean>
  controls?: LamWidgetData[]
}

export interface TextureData extends LamWidgetData {
  type: "texture"
  image: string
  imageWidth: number
  imageHeight: number
}

export type UpdateValueFn = (this: LamControl, forceDefault?: boolean, ...args: unknown[]) => void
export type UpdateFn = (this: LamControl) => void

export interface IconControl extends TextureControl {
  texture?: string
  tooltip?: string
  color?: ZoColorDef
  size?: number
  OnSelect?: (this: void, icon: Control, texture: string) => void
  SetTexture: (this: IconControl, texture: unknown) => void
}

export interface LamControl extends LamWidgetControl {
  data: LamWidgetData
  panel?: LamControl
  isHalfWidth?: boolean
  container?: Control
  label?: LabelControl
  labelContainer?: Control
  faqControl?: LamWidgetControl
  scroll?: Control
  lineControl?: LamWidgetControl
  startValue?: unknown[]
  value?: unknown
  isDisabled?: boolean
  disabled?: boolean
  disabledLabel?: boolean
  warning?: TextureControl
  info?: LabelControl
  website?: LamWidgetControl
  feedback?: LamWidgetControl
  translation?: LamWidgetControl
  donation?: LamWidgetControl
  controlsToRefresh?: LamControl[]
  icon?: IconControl
  bg?: BackdropControl
  arrow?: TextureControl
  animation?: TimelineAnimation
  open?: boolean
  btmToggle?: TextureControl
  button?: LamWidgetControl
  checkbox?: LabelControl
  checkedText?: string
  uncheckedText?: string
  color?: LamWidgetControl
  thumb?: TextureControl
  desc?: LabelControl
  title?: LabelControl
  header?: LabelControl
  divider?: TextureControl
  texture?: TextureControl
  editbox?: EditControl
  slider?: SliderControl
  minText?: LabelControl
  maxText?: LabelControl
  slidervalueBG?: BackdropControl
  slidervalue?: EditControl
  choices?: Record<string | number, unknown>
  combobox?: LamWidgetControl
  dropdown?: LamComboBox
  isMultiSelectionEnabled?: boolean
  m_sortType?: unknown
  m_sortOrder?: unknown
  comboboxCount?: number
  dropdownButton?: ButtonControl
  UpdateValue?: UpdateValueFn
  UpdateDisabled?: UpdateFn
  UpdateWarning?: UpdateFn
  RefreshPanel?: (this: LamControl) => void
  ForceDefaults?: (this: LamControl) => void
  UpdateChoices?: (this: LamControl, ...args: unknown[]) => void
  SetColor: (this: Control, ...args: unknown[]) => void
  SetIconSize?: (this: LamControl, size: number) => void
  SetDropdownHeight?: (
    this: LamControl,
    dropdown: LamComboBox,
    dropdownData: DropdownData
  ) => LuaMultiReturn<[number, number, number]>
  AdjustDimensions?: (this: LamControl) => void
}

export interface IconPickerMenu {
  control: LamWidgetControl
  parent?: LamWidgetControl
  color: ZoColorDef
  refCount?: number
  customOnMouseEnter?: (this: void, icon: Control) => void
  customOnMouseExit?: (this: void, icon: Control) => void
  Clear: (this: IconPickerMenu) => void
  AddIcon: (
    this: IconPickerMenu,
    texturePath: string,
    callback: (this: void, icon: Control, texture: string) => void,
    tooltip?: string
  ) => void
  Show: (this: void, parent: Control) => boolean
  SetColor: (this: IconPickerMenu, color: ZoColorDef) => void
  SetMaxColumns: (this: void, value?: number) => void
  SetIconSize: (this: void, value?: number) => void
  SetVisibleRows: (this: void, value?: number) => void
  SetMouseHandlers: (
    this: void,
    onEnter?: (this: void, icon: Control) => void,
    onExit?: (this: void, icon: Control) => void
  ) => void
  UpdateDimensions: (this: void) => void
  UpdateAnchors: (this: void) => void
}

export interface TooltipData {
  tooltipText?: string | number
  helpUrl?: string
}

export interface TooltipHostControl extends LamWidgetControl {
  data?: TooltipData
}

export interface FaqTextureControl extends TextureControl {
  data?: TooltipData
}

export interface AddonListData {
  panel: LamControl
  name: string
  filterText: string
  sortIndex?: number
}

export interface LamUtil {
  L: import("../addon-menu-ui-strings/addon-menu-ui-strings.module.code.ts").LamStrings
  GetTooltipText: (this: void, value: Valued<string | number>) => string | number
  GetStringFromValue: (this: void, value: Valued<string | number>) => string | number
  GetDefaultValue: <T>(this: void, value: Valued<T>) => T
  GetColorForState: (this: void, disabled: boolean) => ZoColorDef
  CreateBaseControl: (
    this: void,
    parent: LamControl,
    controlData: LamWidgetData,
    controlName?: string
  ) => LamControl
  CreateLabelAndContainerControl: (
    this: void,
    parent: LamControl,
    controlData: LamWidgetData,
    controlName?: string
  ) => LamControl
  SetUpTooltip: (
    this: void,
    control: Control,
    data: LamWidgetData,
    tooltipData?: TooltipData
  ) => void
  RequestRefreshIfNeeded: (this: void, control: LamControl) => void
  RegisterForRefreshIfNeeded: (this: void, control: LamControl) => void
  RegisterForReloadIfNeeded: (this: void, control: LamControl) => void
  GetTopPanel: (this: void, panel: LamControl) => LamControl
  ShowConfirmationDialog: (
    this: void,
    title: string,
    body: string,
    callback: (this: void, ...args: unknown[]) => void
  ) => void
  UpdateWarning: (this: void, control: LamControl) => void
  CreateFAQTexture: (this: void, control: LamControl) => Control | undefined
  GetIconPickerMenu?: (this: void) => IconPickerMenu
}

export interface Lam {
  widgets: Record<string, number>
  util: LamUtil
  controlsForReload: LamControl[]
  requiresReload?: boolean
  applyButton?: Control
  defaultButton?: Control
  addonList?: Control
  currentAddonPanel?: LamControl
  pendingAddonPanel?: LamControl
  currentPanelOpened?: boolean
  panelId?: number
  keybindsInitialized?: boolean
  RegisterWidget: (this: Lam, widgetType: string, widgetVersion: number) => boolean
  RegisterAddonPanel: (this: Lam, addonID: string, panelData: PanelData) => LamControl | undefined
  RegisterOptionControls: (this: Lam, addonID: string, optionsTable: LamWidgetData[]) => void
  OpenToPanel: (this: Lam, panel: LamControl) => void
  GetAddonPanelContainer: (this: Lam) => Control
  GetAddonSettingsFragment: (this: Lam) => ZoFadeSceneFragment
}

export type LamFactory = (
  this: void,
  parent: LamControl,
  data: LamWidgetData,
  controlName?: string
) => LamControl

export interface Lamcc {
  scrollCount: number
  comboboxCount?: number
  [widgetType: string]: LamFactory | number | undefined
}

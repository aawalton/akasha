interface LamPanelData {
  type: "panel"
  name: string
  displayName?: string
  author?: string
  version?: string
  slashCommand?: string
  registerForRefresh?: boolean
  registerForDefaults?: boolean
  website?: string
  feedback?: string
  donation?: string
  resetFunc?: (this: void, control: Control) => void
}

interface LamControlBase {
  name: string
  tooltip?: string
  disabled?: boolean | ((this: void) => boolean)
  warning?: string
  width?: "full" | "half"
  reference?: string
}

interface LamCheckboxData extends LamControlBase {
  type: "checkbox"
  getFunc: (this: void) => boolean
  setFunc: (this: void, value: boolean) => void
  default?: boolean | ((this: void) => boolean)
  requiresReload?: boolean
}

interface LamSliderData extends LamControlBase {
  type: "slider"
  min: number
  max: number
  step?: number
  decimals?: number
  autoSelect?: boolean
  getFunc: (this: void) => number
  setFunc: (this: void, value: number) => void
  default?: number | ((this: void) => number)
  requiresReload?: boolean
  clampInput?: boolean
}

interface LamDropdownData extends LamControlBase {
  type: "dropdown"
  choices: readonly string[]
  choicesValues?: readonly (string | number)[]
  scrollable?: boolean
  getFunc: (this: void) => string | number
  setFunc: (this: void, value: string | number) => void
  default?: string | number | ((this: void) => string | number)
  requiresReload?: boolean
}

interface LamColorpickerData extends LamControlBase {
  type: "colorpicker"
  getFunc: (this: void) => LuaMultiReturn<[r: number, g: number, b: number, a?: number]>
  setFunc: (this: void, r: number, g: number, b: number, a?: number) => void
  default?: unknown
}

interface LamHeaderData {
  type: "header"
  name: string
  width?: "full" | "half"
}

interface LamDescriptionData {
  type: "description"
  text: string
  title?: string
  width?: "full" | "half"
}

interface LamButtonData extends LamControlBase {
  type: "button"
  func: (this: void) => void
  isDangerous?: boolean
}

interface LamSubmenuData {
  type: "submenu"
  name: string
  tooltip?: string
  controls: LamControlData[]
  disabled?: boolean | ((this: void) => boolean)
  disabledLabel?: boolean | ((this: void) => boolean)
  reference?: string
}

interface LamIconpickerData extends LamControlBase {
  type: "iconpicker"
  choices: readonly string[]
  getFunc: (this: void) => string
  setFunc: (this: void, texturePath: string) => void
  choicesTooltips?: readonly string[]
  maxColumns?: number
  visibleRows?: number
  iconSize?: number
  defaultColor?: unknown
  beforeShow?: (this: void, control: Control, iconPicker: Control) => boolean | undefined
  requiresReload?: boolean
  default?: string | ((this: void) => string)
  helpUrl?: string | ((this: void) => string)
  resetFunc?: (this: void, control: Control) => void
}

interface LamEditboxData extends LamControlBase {
  type: "editbox"
  getFunc: (this: void) => string | number
  setFunc: (this: void, text: string) => void
  isMultiline?: boolean
  isExtraWide?: boolean
  maxChars?: number
  textType?: number | ((this: void) => number)
  requiresReload?: boolean
  default?: string | number | ((this: void) => string | number)
  helpUrl?: string | ((this: void) => string)
  resetFunc?: (this: void, control: Control) => void
}

interface LamTextureData {
  type: "texture"
  image: string
  imageWidth: number
  imageHeight: number
  tooltip?: string
  width?: "full" | "half"
  reference?: string
}

interface LamDividerData {
  type: "divider"
  width?: "full" | "half"
  height?: number
  alpha?: number
  reference?: string
}

interface LamCustomData {
  type: "custom"
  reference?: string
  createFunc?: (this: void, control: Control) => void
  refreshFunc?: (this: void, control: Control) => void
  width?: "full" | "half"
  minHeight?: number | ((this: void) => number)
  maxHeight?: number | ((this: void) => number)
  resetFunc?: (this: void, control: Control) => void
}

type LamControlData =
  | LamCheckboxData
  | LamSliderData
  | LamDropdownData
  | LamColorpickerData
  | LamHeaderData
  | LamDescriptionData
  | LamButtonData
  | LamSubmenuData
  | LamIconpickerData
  | LamEditboxData
  | LamTextureData
  | LamDividerData
  | LamCustomData

interface LamReferenceDropdownControl extends Control {
  dropdown: { GetControl: () => Control }
}

interface LibAddonMenu2 {
  RegisterAddonPanel: (addonId: string, panelData: LamPanelData) => Control
  RegisterOptionControls: (addonId: string, optionsTable: LamControlData[]) => void
  OpenToPanel: (panel: unknown) => void
}

declare const LibAddonMenu2: LibAddonMenu2

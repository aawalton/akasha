declare const SI_TEMPER_SCROLLABLEMENU_SLIDER_CURRENT_MIN_MAX_STEP: number

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

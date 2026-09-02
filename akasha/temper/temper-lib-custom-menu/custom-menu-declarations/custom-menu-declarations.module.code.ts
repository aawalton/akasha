declare global {
  type LuaMultiReturn<T extends unknown[]> = T & {
    readonly __tstlMultiReturn: unknown
  }

  const $multi: <T extends unknown[]>(...values: T) => LuaMultiReturn<T>

  function type(
    this: void,
    v: unknown
  ): "nil" | "number" | "string" | "boolean" | "table" | "function" | "thread" | "userdata"

  function error(this: void, message: unknown, level?: number): never

  const string: {
    find: (
      this: void,
      s: string,
      pattern: string,
      init?: number,
      plain?: boolean
    ) => LuaMultiReturn<[number | undefined, number | undefined, ...string[]]>
  }

  const zo_clamp: (this: void, value: number, min: number, max: number) => number
  const zo_max: (this: void, ...values: number[]) => number
  const zo_min: (this: void, ...values: number[]) => number
  const zo_callLater: (this: void, callback: (this: void) => void, delayMs: number) => number

  interface Control {
    SetHidden: (hidden: boolean) => void
    IsHidden: () => boolean
    ClearAnchors: () => void
    SetAnchor: (
      point: number,
      relativeTo?: Control,
      relativePoint?: number,
      offsetX?: number,
      offsetY?: number,
      constrains?: number
    ) => void
    SetAnchorFill: (parent?: Control) => void
    GetAnchor: (
      index: number
    ) => LuaMultiReturn<[boolean, number, Control | undefined, number, number, number, number]>
    SetParent: (parent: Control) => void
    GetParent: <T extends Control = Control>() => T | undefined
    GetNamedChild: <T extends Control = Control>(name: string) => T | undefined
    CreateControl: <T extends Control = Control>(name: string, controlType: number) => T
    SetHandler: (
      event: string,
      handler: ((this: void, ...args: unknown[]) => void) | undefined
    ) => void
    GetHandler: (event: string) => ((this: void, ...args: unknown[]) => void) | undefined
    SetMouseEnabled: (enabled: boolean) => void
    SetAlpha: (alpha: number) => void
    SetDimensions: (width: number, height: number) => void
    GetDimensions: () => LuaMultiReturn<[number, number]>
    GetWidth: () => number
    GetHeight: () => number
    GetLeft: () => number
    GetRight: () => number
    GetDrawLayer: () => number
    GetDrawTier: () => number
    GetDrawLevel: () => number
    SetDrawLayer: (layer: number) => void
    SetDrawTier: (tier: number) => void
    SetDrawLevel: (level: number) => void
    GetOwningWindow: () => Control
    SetClampedToScreen: (clamped: boolean) => void
  }

  interface LabelControl extends Control {
    SetText: (text: string) => void
    SetFont: (font: string) => void
    SetColor: (r: number, g: number, b: number, a?: number) => void
    SetHorizontalAlignment: (alignment: number) => void
    SetMaxLineCount: (count: number) => void
    GetTextDimensions: () => LuaMultiReturn<[number, number]>
  }

  interface TextureControl extends Control {
    SetTexture: (file: string) => void
    SetTextureCoords: (left: number, right: number, top: number, bottom: number) => void
    SetAddressMode: (mode: number) => void
  }

  interface BackdropControl extends Control {
    SetCenterTexture: (textureFile: string) => void
    SetEdgeTexture: (texture: string | undefined, width: number, height: number) => void
    SetInsets: (left: number, top: number, right: number, bottom: number) => void
  }

  interface TooltipControl extends Control {
    GetOwner: () => Control | undefined
  }

  interface ObjectPool<T> {
    AcquireObject: () => LuaMultiReturn<[T, number]>
    ReleaseAllObjects: () => void
    GetNextControlId: () => number
  }

  interface ZoObjectPoolClass {
    New: <T>(
      this: void,
      factory: (this: void, pool: ObjectPool<T>) => T,
      reset: (this: void, obj: T) => void
    ) => ObjectPool<T>
  }
  const ZO_ObjectPool: ZoObjectPoolClass

  interface ZoColorDef {
    UnpackRGBA: () => LuaMultiReturn<[number, number, number, number]>
  }
  interface ZoColorDefClass {
    New: (this: void, r: number, g: number, b: number, a?: number) => ZoColorDef
  }
  const ZO_ColorDef: ZoColorDefClass

  interface ZoCallbackObject {
    RegisterCallback: (
      this: ZoCallbackObject,
      key: number | string,
      callback: (this: void, ...args: unknown[]) => void,
      ...args: unknown[]
    ) => void
    FireCallbacks: (this: ZoCallbackObject, key: number | string, ...args: unknown[]) => void
  }
  interface ZoCallbackObjectClass {
    New: (this: ZoCallbackObjectClass) => ZoCallbackObject
  }
  const ZO_CallbackObject: ZoCallbackObjectClass

  interface EventManager {
    RegisterForEvent: (
      this: EventManager,
      namespace: string,
      event: number,
      callback: (this: void, eventCode: number, ...args: never[]) => void
    ) => boolean
    UnregisterForEvent: (this: EventManager, namespace: string, event: number) => boolean
    RegisterForUpdate: (
      this: EventManager,
      namespace: string,
      interval: number,
      callback: (this: void) => void
    ) => boolean
    UnregisterForUpdate: (this: EventManager, namespace: string) => boolean
  }
  const EVENT_MANAGER: EventManager

  interface WindowManager {
    CreateControl: (
      this: WindowManager,
      name: string | undefined,
      parent: Control | undefined,
      controlType: number
    ) => LabelControl
    CreateControlFromVirtual: <T extends Control = Control>(
      this: WindowManager,
      name: string,
      parent: Control | undefined,
      virtualName: string
    ) => T
    GetMouseOverControl: (this: WindowManager) => Control | undefined
  }
  const WINDOW_MANAGER: WindowManager

  const CreateControlFromVirtual: <T extends Control = Control>(
    this: void,
    name: string,
    parent: Control | undefined,
    templateName: string,
    suffix?: string | number
  ) => T

  const GetControl: <T extends Control = Control>(
    this: void,
    control: Control,
    suffix: string
  ) => T | undefined

  const GuiRoot: Control
  const ZO_Menu: Control
  const ZO_Menus: Control
  const InformationTooltip: TooltipControl

  const InitializeTooltip: (
    this: void,
    tooltip: TooltipControl,
    owner: Control,
    anchor: number,
    offsetX?: number,
    offsetY?: number
  ) => void
  const SetTooltipText: (this: void, tooltip: TooltipControl, text: string) => void
  const ClearTooltip: (this: void, tooltip: TooltipControl) => void

  const GetInterfaceColor: (
    this: void,
    colorType: number,
    colorIndex: number
  ) => LuaMultiReturn<[number, number, number, number]>

  const GetTimeStamp: (this: void) => number
  const ClearMenu: (this: void) => void
  const IsControlKeyDown: (this: void) => boolean
  const IsAltKeyDown: (this: void) => boolean
  const IsShiftKeyDown: (this: void) => boolean
  const IsCommandKeyDown: (this: void) => boolean
  const ZO_IsConsoleUI: (this: void) => boolean
  const IgnoreMouseDownEditFocusLoss: (this: void, ...args: unknown[]) => void

  const ZO_PreHook: ((
    this: void,
    existingFunctionName: string,
    hookFunction: (this: void, ...args: never[]) => unknown
  ) => void) &
    ((
      this: void,
      objectTable: Record<string, unknown>,
      existingFunctionName: string,
      hookFunction: (this: void, ...args: never[]) => unknown
    ) => void)

  const ZO_Menu_EnterItem: (this: void, control: Control) => void
  const ZO_Menu_ExitItem: (this: void, control: Control) => void
  const ZO_Menu_ClickItem: (this: void, control: Control, button: number) => void
  const ZO_Menu_SetLastCommandWasFromMenu: (this: void, fromMenu: boolean) => void

  const AddMenuItem: (
    this: void,
    labelText: string,
    callback?: ((this: void) => void) | undefined,
    itemType?: number,
    myFont?: string,
    normalColor?: unknown,
    highlightColor?: unknown,
    itemYPad?: number,
    ...rest: unknown[]
  ) => number

  const ZO_CheckButton_OnClicked: (this: void, checkButton: Control, button: number) => void
  const ZO_CheckButton_IsChecked: (this: void, checkButton: Control) => boolean
  const ZO_CheckButton_SetToggleFunction: (
    this: void,
    checkButton: Control,
    toggleFunction: ((this: void, checkButton: Control) => void) | undefined
  ) => void
  const ZO_CheckButton_SetCheckState: (this: void, checkButton: Control, checked: boolean) => void
  const ZO_CheckButton_SetUnchecked: (this: void, checkButton: Control) => void

  const ZO_ScrollList_GetData: (this: void, control: Control) => unknown

  const ZO_WHITE: ZoColorDef
  const ZO_DEFAULT_DISABLED_COLOR: ZoColorDef

  interface ZoInventorySlotActions {
    m_contextMenuMode?: boolean
    Show: (this: ZoInventorySlotActions) => void
    AddSlotAction: (this: ZoInventorySlotActions, ...args: unknown[]) => void
    GetPrimaryActionName: (this: ZoInventorySlotActions, ...args: unknown[]) => unknown
    AddCustomSlotAction?: (this: ZoInventorySlotActions, ...args: unknown[]) => void
  }
  const ZO_InventorySlotActions: ZoInventorySlotActions

  interface SocialListOwner {
    [handlerName: string]: ((this: void, ...args: unknown[]) => unknown) | undefined
  }
  const FRIENDS_LIST: SocialListOwner
  const IGNORE_LIST: SocialListOwner
  const GROUP_LIST: SocialListOwner
  const GUILD_ROSTER_KEYBOARD: SocialListOwner

  interface SharedChatSystem {
    ShowPlayerContextMenu: (
      this: SharedChatSystem,
      playerName: string,
      rawName: string,
      ...rest: unknown[]
    ) => unknown
  }
  const SharedChatSystem: SharedChatSystem

  var MENU_ADD_OPTION_HEADER: number
  const MENU_ADD_OPTION_LABEL: number
  const MENU_ADD_OPTION_CHECKBOX: number

  const TOPLEFT: number
  const TOPRIGHT: number
  const BOTTOMLEFT: number
  const BOTTOMRIGHT: number
  const LEFT: number
  const RIGHT: number
  const BOTTOM: number
  const ANCHOR_CONSTRAINS_X: number

  const CT_CONTROL: number
  const CT_TEXTURE: number
  const CT_LABEL: number
  const CT_BACKDROP: number
  const TEX_MODE_WRAP: number

  const MOUSE_BUTTON_INDEX_LEFT: number
  const MOUSE_BUTTON_INDEX_RIGHT: number

  const KEY_CTRL: number
  const KEY_ALT: number
  const KEY_SHIFT: number
  const KEY_COMMAND: number

  const EVENT_ADD_ON_LOADED: number
  const EVENT_PLAYER_ACTIVATED: number
  const EVENT_GLOBAL_MOUSE_UP: number

  const INTERFACE_COLOR_TYPE_TEXT_COLORS: number
  const INTERFACE_TEXT_COLOR_NORMAL: number
  const INTERFACE_TEXT_COLOR_CONTEXT_HIGHLIGHT: number
}

export {}

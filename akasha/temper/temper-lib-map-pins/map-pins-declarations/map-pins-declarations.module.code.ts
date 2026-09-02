declare global {
  type AnyNotNil = {}

  type LuaMultiReturn<T extends unknown[]> = T

  const $multi: <T extends unknown[]>(this: void, ...values: T) => LuaMultiReturn<T>

  interface LuaTable<K extends AnyNotNil, V> extends Iterable<[K, V]> {
    get: (key: K) => V | undefined
    set: (key: K, value: V) => void
    has: (key: K) => boolean
  }
  const LuaTable: { new <K extends AnyNotNil, V>(): LuaTable<K, V> }

  function pairs<T>(this: void, t: T): Iterable<[keyof T, NonNullable<T[keyof T]>]>
  const next: <T>(
    this: void,
    t: T,
    index?: unknown
  ) => LuaMultiReturn<[key: keyof T | undefined, value: T[keyof T] | undefined]>
  function type(
    this: void,
    v: unknown
  ): "nil" | "number" | "string" | "boolean" | "table" | "function" | "thread" | "userdata"
  function tostring(this: void, v: unknown): string
  const getmetatable: (this: void, value: unknown) => { __index?: unknown } | undefined
  const unpack: <T extends unknown[]>(this: void, list: T) => LuaMultiReturn<T>
  function error(this: void, message: unknown, level?: number): never

  interface LuaStringLib {
    find: (
      s: string,
      pattern: string,
      init?: number,
      plain?: boolean
    ) => LuaMultiReturn<[start: number | undefined, finish: number | undefined]>
    format: (formatstring: string, ...args: unknown[]) => string
    gmatch: (s: string, pattern: string) => Iterable<LuaMultiReturn<string[]>>
    gsub: (
      s: string,
      pattern: string,
      replacement: string,
      n?: number
    ) => LuaMultiReturn<[result: string, count: number]>
    lower: (s: string) => string
  }
  const string: LuaStringLib

  interface Control {
    oldOffsetY?: number
    SetParent: (this: Control, parent: Control) => void
    GetAnchor: (
      this: Control,
      index: number
    ) => LuaMultiReturn<
      [
        isValid: boolean,
        point: number,
        relativeTo: Control | undefined,
        relativePoint: number,
        offsetX: number,
        offsetY: number,
        restrain: number,
      ]
    >
    SetAnchor: (
      this: Control,
      point: number,
      relativeTo?: Control,
      relativePoint?: number,
      offsetX?: number,
      offsetY?: number,
      restrain?: number
    ) => void
    SetAnchorFill: (this: Control, parent?: Control) => void
    ClearAnchors: (this: Control) => void
    GetNamedChild: (this: Control, name: string) => Control | undefined
    GetHeight: (this: Control) => number
    SetHidden: (this: Control, hidden: boolean) => void
    IsControlHidden: (this: Control) => boolean
    SetHandler: (
      this: Control,
      handlerName: string,
      handler: (this: void, ...args: never[]) => unknown
    ) => void
  }

  interface WorldMapFilterControlPool {
    parent?: Control
    m_Active: Record<number, Control>
    AcquireObject: (this: WorldMapFilterControlPool) => Control
  }

  interface WorldMapFilterPanel {
    checkBoxPool?: WorldMapFilterControlPool
    comboBoxPool?: WorldMapFilterControlPool
    control?: Control
    AnchorControl: (this: WorldMapFilterPanel, control: Control) => void
  }

  interface ResolvedFilterPanel {
    checkBoxPool: WorldMapFilterControlPool
    AnchorControl: (this: ResolvedFilterPanel, control: Control) => void
  }

  interface WorldMapFiltersObject {
    pvePanel?: WorldMapFilterPanel
    pvpPanel?: WorldMapFilterPanel
    imperialPvPPanel?: WorldMapFilterPanel
    battlegroundPanel?: WorldMapFilterPanel
  }
  const WORLD_MAP_FILTERS: WorldMapFiltersObject

  const ZO_WorldMapFiltersPvE: Control | undefined
  const ZO_WorldMapFiltersPvEContainer: Control | undefined
  const ZO_WorldMapFiltersPvEContainerScrollChild: Control | undefined
  const ZO_WorldMapFiltersPvECheckBox1: Control | undefined
  const ZO_WorldMapFiltersPvEComboBox1: Control | undefined

  const ZO_WorldMapFiltersPvP: Control | undefined
  const ZO_WorldMapFiltersPvPContainer: Control | undefined
  const ZO_WorldMapFiltersPvPContainerScrollChild: Control | undefined
  const ZO_WorldMapFiltersPvPCheckBox1: Control | undefined
  const ZO_WorldMapFiltersPvPComboBox1: Control | undefined

  const ZO_WorldMapFiltersImperialPvP: Control | undefined
  const ZO_WorldMapFiltersImperialPvPContainer: Control | undefined
  const ZO_WorldMapFiltersImperialPvPContainerScrollChild: Control | undefined
  const ZO_WorldMapFiltersImperialPvPCheckBox1: Control | undefined
  const ZO_WorldMapFiltersImperialPvPComboBox1: Control | undefined

  const ZO_WorldMapFiltersBattleground: Control | undefined
  const ZO_WorldMapFiltersBattlegroundContainer: Control | undefined
  const ZO_WorldMapFiltersBattlegroundContainerScrollChild: Control | undefined
  const ZO_WorldMapFiltersBattlegroundCheckBox1: Control | undefined
  const ZO_WorldMapFiltersBattlegroundComboBox1: Control | undefined

  interface GamepadParametricScrollList {
    SetAlignToScreenCenter: (this: GamepadParametricScrollList, align: boolean) => void
    SetOnSelectedDataChangedCallback: (
      this: GamepadParametricScrollList,
      callback: (this: void, ...args: unknown[]) => void
    ) => void
    AddDataTemplate: (
      this: GamepadParametricScrollList,
      templateName: string,
      setupFunction: unknown,
      equalityFunction: unknown
    ) => void
    AddDataTemplateWithHeader: (
      this: GamepadParametricScrollList,
      templateName: string,
      setupFunction: unknown,
      equalityFunction: unknown,
      selectionTemplate: unknown,
      headerTemplate: string
    ) => void
    AddEntry: (this: GamepadParametricScrollList, templateName: string, entryData: object) => void
  }

  interface GamepadParametricScrollListClass {
    New: (
      this: GamepadParametricScrollListClass,
      listControl: Control
    ) => GamepadParametricScrollList
  }
  const ZO_GamepadVerticalParametricScrollList: GamepadParametricScrollListClass

  interface GamepadFilterPanel {
    control?: Control
    list?: GamepadParametricScrollList
    gamepadMapFiltersInfo?: object[]
    pinFilterCheckBoxes: object[]
    SetPinFilter: (this: GamepadFilterPanel, pinTypeId: number, enabled: boolean) => void
    BuildControls: (this: GamepadFilterPanel) => void
    SetupDropDown: (this: GamepadFilterPanel, ...args: unknown[]) => void
    [key: string]: unknown
  }

  interface GamepadWorldMapFilters {
    currentPanel?: GamepadFilterPanel
    pvePanel: GamepadFilterPanel
    pvpPanel: GamepadFilterPanel
    imperialPvPPanel: GamepadFilterPanel
    battlegroundPanel: GamepadFilterPanel
    SelectKeybind?: (this: GamepadWorldMapFilters) => void
    [key: string]: unknown
  }
  const GAMEPAD_WORLD_MAP_FILTERS: GamepadWorldMapFilters | undefined

  interface ZoGamepadEntryDataInstance {
    currentValue: boolean
    SetDataSource: (this: ZoGamepadEntryDataInstance, dataSource: object) => void
    [key: string]: unknown
  }
  interface ZoGamepadEntryDataClass {
    New: (this: ZoGamepadEntryDataClass, displayName: string) => ZoGamepadEntryDataInstance
  }
  const ZO_GamepadEntryData: ZoGamepadEntryDataClass

  const SCREEN_NARRATION_MANAGER: {
    QueueParametricListEntry: (list: GamepadParametricScrollList) => void
  }

  const ZO_FormatToggleNarrationText: (this: void, text: string, value: boolean) => unknown

  const ZO_GamepadCheckboxOptionTemplate_Setup: unknown
  const ZO_GamepadMenuEntryTemplateParametricListFunction: unknown

  interface LibDebugLoggerInstance {
    Info: (this: LibDebugLoggerInstance, message: string) => void
    Debug: (this: LibDebugLoggerInstance, message: string) => void
    Verbose: (this: LibDebugLoggerInstance, message: string) => void
    Warn: (this: LibDebugLoggerInstance, message: string) => void
  }
  const LibDebugLogger:
    | {
        Create: (this: void, loggerName: string) => LibDebugLoggerInstance
      }
    | undefined

  const DebugLogViewer: unknown | undefined

  interface EventManager {
    RegisterForEvent: (
      this: EventManager,
      namespace: string,
      event: number,
      callback: (this: void, eventCode: number, ...args: never[]) => void
    ) => void
    UnregisterForEvent: (this: EventManager, namespace: string, event: number) => void
  }
  const EVENT_MANAGER: EventManager

  interface CallbackManager {
    FireCallbacks: (this: CallbackManager, callbackName: string, ...args: unknown[]) => void
    RegisterCallback: (
      this: CallbackManager,
      callbackName: string,
      callback: (this: void, ...args: never[]) => void
    ) => void
  }
  const CALLBACK_MANAGER: CallbackManager

  interface ChatRouter {
    AddSystemMessage: (this: ChatRouter, message: string) => void
  }
  const CHAT_ROUTER: ChatRouter

  interface WindowManager {
    CreateControlFromVirtual: (
      this: WindowManager,
      name: string,
      parent: Control | undefined,
      template: string
    ) => Control
  }
  const WINDOW_MANAGER: WindowManager

  interface ZoColorDefClass {
    New: (this: ZoColorDefClass, r: number, g: number, b: number, a: number) => object
  }
  const ZO_ColorDef: ZoColorDefClass

  interface GamepadTooltipSection {
    GetStyle: (this: GamepadTooltipSection, styleName: string) => unknown
  }
  interface GamepadMapLocationTooltip {
    tooltip: GamepadTooltipSection
    LayoutIconStringLine: (
      this: GamepadMapLocationTooltip,
      section: GamepadTooltipSection,
      icon: string | undefined,
      text: string,
      style: unknown
    ) => void
  }
  const ZO_MapLocationTooltip_Gamepad: GamepadMapLocationTooltip

  const ZO_MAP_TOOLTIP_MODE: { INFORMATION: number }
  const InformationTooltip: Control
  const ZO_MapPin: object
  const SLASH_COMMANDS: Record<string, (this: void, ...args: never[]) => void>

  function d(this: void, ...args: unknown[]): undefined
  const df: (this: void, formatstring: string, ...args: unknown[]) => void
  const zo_strformat: (this: void, formatstring: string | number, ...args: unknown[]) => string
  const ZO_CachedStrFormat: (
    this: void,
    formatstring: string | number,
    ...args: unknown[]
  ) => string
  const SetTooltipText: (this: void, tooltip: Control, text: string) => void
  const IsInGamepadPreferredMode: (this: void) => boolean
  const ZO_CheckButton_SetCheckState: (this: void, checkButton: Control, checked: boolean) => void
  const ZO_CheckButton_SetLabelText: (this: void, checkButton: Control, text: string) => void
  const ZO_CheckButton_SetToggleFunction: (
    this: void,
    checkButton: Control,
    toggleFunction: (this: void, control: Control, state: boolean) => void
  ) => void
  const ZO_Tooltips_ShowTextTooltip: (
    this: void,
    control: Control,
    anchor: number,
    text: string | undefined
  ) => void
  const ZO_Tooltips_HideTextTooltip: (this: void) => void
  const ZO_PreHook: (
    this: void,
    objectTable: object,
    existingFunctionName: string,
    hookFunction: (this: void, ...args: never[]) => unknown
  ) => void
  const ZO_PostHook: (
    this: void,
    objectTable: object,
    methodName: string,
    hookFunction: (this: void, ...args: never[]) => void
  ) => void
  const ZO_WorldMap_GetPinManager: (this: void) => unknown
  const GetMapFilterType: (this: void) => number
  const GetMapTileTexture: (this: void, tileIndex?: number) => string
  const GetMapName: (this: void) => string
  const GetMapPlayerPosition: (
    this: void,
    unitTag: string
  ) => LuaMultiReturn<[x: number, y: number, heading: number]>
  const SetMapToPlayerLocation: (this: void) => number

  const MAP_FILTER_TYPE_STANDARD: number
  const MAP_FILTER_TYPE_AVA_CYRODIIL: number
  const MAP_FILTER_TYPE_AVA_IMPERIAL: number
  const MAP_FILTER_TYPE_BATTLEGROUND: number
  const MAP_FILTER_TYPE_GLOBAL: number
  const SET_MAP_RESULT_MAP_CHANGED: number
  const SI_WINDOW_TITLE_WORLD_MAP: number
  const EVENT_ADD_ON_LOADED: number
  const LEFT: number
  const MOUSE_BUTTON_INDEX_LEFT: number
  const MOUSE_BUTTON_INDEX_RIGHT: number
}

export {}

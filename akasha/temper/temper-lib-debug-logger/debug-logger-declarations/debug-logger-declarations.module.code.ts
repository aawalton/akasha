declare global {
  interface LuaStringLib {
    format: (this: void, formatter: string, ...args: unknown[]) => string
    sub: (this: void, subject: string, from: number, to?: number) => string
    lower: (this: void, subject: string) => string
    find: (this: void, subject: string, pattern: string) => [number | undefined, number | undefined]
    match: (
      this: void,
      subject: string,
      pattern: string
    ) => [string | undefined, string | undefined]
  }

  interface LuaTableLib {
    concat: (this: void, list: readonly (string | number)[], separator?: string) => string
  }

  interface LuaMathLib {
    max: (this: void, ...values: number[]) => number
  }

  interface LuaOsLib {
    date: (this: void, formatter: string, at?: number) => string
    time: (this: void) => number
  }

  var string: LuaStringLib
  var table: LuaTableLib
  var math: LuaMathLib
  var os: LuaOsLib

  function type(
    this: void,
    v: unknown
  ): "nil" | "number" | "string" | "boolean" | "table" | "function" | "thread" | "userdata"

  function tostring(this: void, v: unknown): string

  function pairs<T>(this: void, t: T): Iterable<[keyof T, NonNullable<T[keyof T]>]>

  function error(this: void, message: string, level?: number): never

  function rawget(this: void, subject: object, key: string): unknown

  function collectgarbage(this: void, option: string): number

  function pcall<A extends unknown[], R>(
    this: void,
    f: (this: void, ...args: A) => R,
    ...args: A
  ): [boolean, R]

  function setmetatable<T extends object>(this: void, subject: T, meta: object): T

  var zo_strsplit: (this: void, separator: string, input: string) => string[]

  var zo_strformat: (this: void, formatter: string, ...args: unknown[]) => string

  interface ZoObjectClass {
    Subclass: <T = object>() => T
    New: <T = object>(this: void, self: object, ...args: readonly unknown[]) => T
    readonly __call?: (this: void, ...args: readonly unknown[]) => unknown
  }

  var ZO_Object: ZoObjectClass

  var ZO_InitializingObject: {
    readonly __call?: (this: void, ...args: readonly unknown[]) => unknown
  }

  interface ZoCallbackObjectInstance {
    RegisterCallback: (
      this: ZoCallbackObjectInstance,
      callbackName: string,
      callback: (this: void, ...args: unknown[]) => void
    ) => void
    FireCallbacks: (
      this: ZoCallbackObjectInstance,
      callbackName: string,
      ...args: unknown[]
    ) => void
  }

  interface ZoCallbackObjectClass {
    New: (this: ZoCallbackObjectClass) => ZoCallbackObjectInstance
  }

  var ZO_CallbackObject: ZoCallbackObjectClass

  var ZO_ShallowTableCopy: <T>(this: void, source: T, target?: object) => T

  var ZO_ClearTable: (this: void, subject: object) => void

  interface ZoPreHook {
    (
      this: void,
      existingFunctionName: string,
      hookFunction: (this: void, ...args: unknown[]) => unknown
    ): ((this: void, ...args: unknown[]) => unknown) | undefined
    (
      this: void,
      objectTable: Record<string, unknown>,
      existingFunctionName: string,
      hookFunction: (this: void, ...args: unknown[]) => unknown
    ): ((this: void, ...args: unknown[]) => unknown) | undefined
  }

  var ZO_PreHook: ZoPreHook

  interface LibChatMessageInstance {
    Print: (this: LibChatMessageInstance, message: string) => void
    Printf: (this: LibChatMessageInstance, formatter: string, ...args: unknown[]) => void
  }

  var LibChatMessage:
    | ((this: void, id: string, abbreviation: string) => LibChatMessageInstance)
    | undefined

  interface EventManagerInstance {
    RegisterForEvent: (
      this: EventManagerInstance,
      namespace: string,
      event: number,
      handler: (this: void, ...args: never[]) => unknown
    ) => boolean
  }

  var EVENT_MANAGER: EventManagerInstance

  interface ChatRouterInstance {
    AddSystemMessage: (this: ChatRouterInstance, message: string) => void
  }

  var CHAT_ROUTER: ChatRouterInstance

  interface GuiRootControl {
    GetWidth: (this: GuiRootControl) => number
    GetHeight: (this: GuiRootControl) => number
  }

  var GuiRoot: GuiRootControl

  var SLASH_COMMANDS: Record<string, (this: void, params: string) => void>

  var SOUNDS: Readonly<Record<string, string>>

  interface AddOnManagerInstance {
    GetNumAddOns: (this: AddOnManagerInstance) => number
    GetAddOnInfo: (
      this: AddOnManagerInstance,
      index: number
    ) => [string, string, string, string, boolean, number]
    GetAddOnVersion: (this: AddOnManagerInstance, index: number) => number
    GetAddOnRootDirectoryPath: (this: AddOnManagerInstance, index: number) => string
    GetAddOnNumDependencies: (this: AddOnManagerInstance, index: number) => number
    GetAddOnDependencyInfo: (
      this: AddOnManagerInstance,
      index: number,
      dependencyIndex: number
    ) => [string, boolean, boolean, number, number]
    GetLoadOutOfDateAddOns: (this: AddOnManagerInstance) => boolean
  }

  var GetAddOnManager: (this: void) => AddOnManagerInstance

  var ScriptBuildInfo: (this: void) => Record<string, string>

  var GetAPIVersion: (this: void) => number
  var GetCVar: (this: void, name: string) => string
  var GetDisplayName: (this: void) => string
  var GetESOVersionString: (this: void) => string
  var GetFramerate: (this: void) => number
  var GetGameTimeMilliseconds: (this: void) => number
  var GetKeyboardLayout: (this: void) => string
  var GetLatency: (this: void) => number
  var GetMostRecentGamepadType: (this: void) => number
  var GetPlatformServiceType: (this: void) => number
  var GetSetting: (this: void, settingType: number, settingId: number) => string
  var GetTimeStamp: (this: void) => number
  var GetTrialInfo: (this: void) => [number, boolean]
  var GetUICustomScale: (this: void) => number
  var GetUIGlobalScale: (this: void) => number
  var GetUnitName: (this: void, unitTag: string) => string
  var GetWorldName: (this: void) => string
  var IsESOPlusSubscriber: (this: void) => boolean
  var IsInGamepadPreferredMode: (this: void) => boolean
  var IsMacUI: (this: void) => boolean
  var IsMinSpecMachine: (this: void) => boolean

  var ADDON_STATE_NO_STATE: number
  var ADDON_STATE_TOC_LOADED: number
  var ADDON_STATE_ENABLED: number
  var ADDON_STATE_DISABLED: number
  var ADDON_STATE_VERSION_MISMATCH: number
  var ADDON_STATE_DEPENDENCIES_DISABLED: number
  var ADDON_STATE_ERROR_STATE_UNABLE_TO_LOAD: number

  var EVENT_ADD_ON_LOADED: number
  var EVENT_LUA_ERROR: number
  var EVENT_PLAYER_ACTIVATED: number
  var EVENT_PLAYER_DEACTIVATED: number

  var FULLSCREEN_MODE_FULLSCREEN_EXCLUSIVE: number
  var FULLSCREEN_MODE_FULLSCREEN_WINDOWED: number
  var FULLSCREEN_MODE_WINDOWED: number

  var GAMEPAD_TYPE_NONE: number
  var GAMEPAD_TYPE_XBOX: number
  var GAMEPAD_TYPE_PS4: number
  var GAMEPAD_TYPE_PS4_NO_TOUCHPAD: number
  var GAMEPAD_TYPE_SWITCH: number
  var GAMEPAD_TYPE_STADIA: number
  var GAMEPAD_TYPE_PS5: number
  var GAMEPAD_TYPE_XBSX: number
  var GAMEPAD_TYPE_DEPRECATED: number

  var PLATFORM_SERVICE_TYPE_ZOS: number
  var PLATFORM_SERVICE_TYPE_PSN: number
  var PLATFORM_SERVICE_TYPE_XBL: number
  var PLATFORM_SERVICE_TYPE_DMM: number
  var PLATFORM_SERVICE_TYPE_STEAM: number
  var PLATFORM_SERVICE_TYPE_EPIC: number

  var GRAPHICS_SETTING_FULLSCREEN: number
  var SETTING_TYPE_GRAPHICS: number
  var SETTING_TYPE_UI: number
  var UI_SETTING_USE_CUSTOM_SCALE: number
  var UI_ALERT_CATEGORY_ERROR: number
}

export {}

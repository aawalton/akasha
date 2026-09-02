declare global {
  type LuaMultiReturn<T extends unknown[]> = T & {
    readonly __tstlMultiReturn: unknown
  }

  const $multi: <T extends unknown[]>(...values: T) => LuaMultiReturn<T>

  function error(this: void, message: unknown, level?: number): never
  function pairs<T>(this: void, t: T): Iterable<[keyof T, NonNullable<T[keyof T]>]>
  function select<T>(this: void, index: number, ...args: T[]): LuaMultiReturn<T[]>
  function select<T>(this: void, index: "#", ...args: T[]): number
  function setmetatable(this: void, table: object, metatable?: object | null): object
  function tonumber(this: void, e: unknown, base?: number): number | undefined
  function tostring(this: void, v: unknown): string
  function type(
    this: void,
    v: unknown
  ): "nil" | "number" | "string" | "boolean" | "table" | "function" | "thread" | "userdata"

  const os: {
    date: (this: void, format?: string, time?: number) => string
  }

  const string: {
    format: (this: void, formatstring: string, ...args: unknown[]) => string
    gsub: (
      this: void,
      s: string,
      pattern: string,
      repl: string | Record<string, string> | ((...matches: string[]) => string),
      n?: number
    ) => LuaMultiReturn<[string, number]>
    lower: (this: void, s: string) => string
    sub: (this: void, s: string, i: number, j?: number) => string
  }

  const table: {
    concat: (this: void, list: (string | number)[], sep?: string, i?: number, j?: number) => string
  }

  type ChatMessageFormatter = (this: void, ...args: unknown[]) => LuaMultiReturn<unknown[]>

  type ChatFormatterTable = Record<string | number, ChatMessageFormatter>

  interface ChatRouter {
    GetRegisteredMessageFormatters: () => ChatFormatterTable
    RegisterMessageFormatter: (key: string, formatter: ChatMessageFormatter) => void
    FormatAndAddChatMessage: (...args: unknown[]) => void
    registeredMessageFormatters: ChatFormatterTable
  }
  const CHAT_ROUTER: ChatRouter

  interface ZoColorDef {
    ToHex: () => string
  }

  interface ChatWindowBuffer {
    Clear: () => void
  }
  interface ChatWindow {
    buffer: ChatWindowBuffer
  }
  interface ChatWindowPool {
    GetActiveObjects: () => Record<number, ChatWindow>
  }
  interface ChatEditControl {
    SetAllowMarkupType: (markupType: number) => void
  }
  interface KeyboardChatSystem {
    windowPool: ChatWindowPool
    GetEditControl: () => ChatEditControl
  }
  const KEYBOARD_CHAT_SYSTEM: KeyboardChatSystem

  type LinkHandlerCallback = (
    this: void,
    link: string,
    button: number,
    text: string,
    color: unknown,
    linkType: string,
    ...rest: unknown[]
  ) => boolean | undefined

  interface LinkHandler {
    LINK_CLICKED_EVENT: string
    LINK_MOUSE_UP_EVENT: string
    RegisterCallback: (eventName: string, callback: LinkHandlerCallback) => void
  }
  const LINK_HANDLER: LinkHandler

  interface EventManager {
    RegisterForEvent: (
      namespace: string,
      event: number,
      callback: (this: void, eventCode: number, ...args: never[]) => void
    ) => boolean
    UnregisterForEvent: (namespace: string, event: number) => boolean
  }
  const EVENT_MANAGER: EventManager

  const SLASH_COMMANDS: Record<string, (this: void, params: string) => void>
  const SOUNDS: Readonly<Record<string, string>>
  const ZO_VALID_LINK_TYPES_CHAT: Record<string, boolean>

  let LibChatMessageSettings: Record<string, unknown> | undefined
  let LibChatMessageHistory: Record<string, unknown> | undefined

  const ALLOW_MARKUP_TYPE_ALL: number
  const CHAT_CATEGORY_SYSTEM: number
  const EVENT_ADD_ON_LOADED: number
  const EVENT_BATTLEGROUND_INACTIVITY_WARNING: number
  const EVENT_BROADCAST: number
  const EVENT_CHAT_MESSAGE_CHANNEL: number
  const EVENT_FRIEND_PLAYER_STATUS_CHANGED: number
  const EVENT_GROUP_INVITE_RESPONSE: number
  const EVENT_GROUP_MEMBER_LEFT: number
  const EVENT_GROUP_TYPE_CHANGED: number
  const EVENT_IGNORE_ADDED: number
  const EVENT_IGNORE_REMOVED: number
  const EVENT_PLAYER_ACTIVATED: number
  const EVENT_SOCIAL_ERROR: number
  const EVENT_TRIAL_FEATURE_RESTRICTED: number
  const EVENT_UI_ERROR: number
  const LIB_CHATMESSAGE_UNKNOWN_DESCRIPTION: number
  const MOUSE_BUTTON_INDEX_LEFT: number

  const GetDisplayName: (this: void) => string
  const GetString: (this: void, stringVariablePrefix: string, value: string | number) => string
  const GetTimeStamp: (this: void) => number
  const GetWorldName: (this: void) => string
  const IsChatSystemAvailableForCurrentPlatform: (this: void) => boolean
  const IsKeyboardUISupported: (this: void) => boolean

  const SecurePostHook: (
    this: void,
    target: object,
    methodName: string,
    hook: (this: void, ...args: never[]) => void
  ) => void

  const ZO_Alert: (this: void, category: number, sound: string, message: string) => void
  const ZO_ChatSystem_GetEventCategoryMappings: (
    this: void
  ) => LuaMultiReturn<[unknown, Record<string, number>]>
  const ZO_CreateStringId: (this: void, key: string, value: string) => void
  const ZO_LinkHandler_CreateLink: (
    this: void,
    text: string,
    color: unknown,
    linkType: string,
    ...data: unknown[]
  ) => string
  const ZO_LinkHandler_CreateLinkWithoutBrackets: (
    this: void,
    text: string,
    color: unknown,
    linkType: string,
    ...data: unknown[]
  ) => string
  const ZO_PreHook: (
    this: void,
    objectTable: Record<string, unknown>,
    existingFunctionName: string,
    hookFunction: (this: void, ...args: never[]) => unknown
  ) => ((this: void, ...args: unknown[]) => unknown) | undefined
  const ZO_ShallowTableCopy: <T>(this: void, source: T, target?: object) => T

  const zo_callLater: (this: void, fn: (this: void) => void, ms: number) => number
  const zo_strformat: (this: void, format: string | number, ...args: unknown[]) => string
  const zo_strsplit: (this: void, separator: string, text: string) => LuaMultiReturn<string[]>
}

export {}

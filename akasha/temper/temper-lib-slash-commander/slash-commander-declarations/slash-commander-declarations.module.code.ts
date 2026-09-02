import type { AutoCompleteProvider } from "../slash-commander-types/slash-commander-types.module.code.ts"

declare global {
  type AnyNotNil = {}

  type LuaMultiReturn<T extends unknown[]> = T & {
    readonly __tstlMultiReturn: unknown
  }

  const $multi: <T extends unknown[]>(...values: T) => LuaMultiReturn<T>

  interface LuaSet<T extends AnyNotNil = AnyNotNil> extends Iterable<T> {
    add: (value: T) => undefined
    has: (value: T) => boolean
    delete: (value: T) => boolean
    isEmpty: () => boolean
  }

  const LuaSet: new <T extends AnyNotNil = AnyNotNil>() => LuaSet<T>

  function pairs<T>(this: void, t: T): Iterable<[keyof T, NonNullable<T[keyof T]>]>

  function type(
    this: void,
    v: unknown
  ): "nil" | "number" | "string" | "boolean" | "table" | "function" | "thread" | "userdata"

  function error(this: void, message: unknown, level?: number): never

  function getmetatable<T>(this: void, object: T): object | undefined

  function setmetatable<T extends object>(this: void, table: T, metatable?: object | null): T

  function next<T extends object>(
    this: void,
    table: T,
    index?: unknown
  ): LuaMultiReturn<[unknown, unknown] | []>

  function unpack<T>(this: void, list: readonly T[]): LuaMultiReturn<T[]>

  const _G: Record<string, unknown>

  const string: {
    sub: (this: void, s: string, i: number, j?: number) => string
    format: (this: void, format: string, ...args: readonly unknown[]) => string
    match: (
      this: void,
      s: string,
      pattern: string,
      init?: number
    ) => LuaMultiReturn<[string | undefined, string | undefined]>
    gsub: (
      this: void,
      s: string,
      pattern: string,
      replacement: string,
      n?: number
    ) => LuaMultiReturn<[string, number]>
  }

  const df: (this: void, message: string, ...args: readonly unknown[]) => undefined
  const zo_strlower: (this: void, s: string) => string

  const GetString: (this: void, stringId: number | string, index?: number) => string
  const GetNumEmotes: (this: void) => number
  const GetEmoteInfo: (
    this: void,
    index: number
  ) => LuaMultiReturn<[string, string, string, string]>
  const GetDynamicChatChannelName: (this: void, channelId: number) => string
  const IsCommunicationRestricted: (this: void) => boolean
  const CanCommunicateWith: (this: void, characterOrDisplayName: string) => boolean
  const IsChatSystemAvailableForCurrentPlatform: (this: void) => boolean

  const SLASH_COMMANDS: Record<string, unknown>

  const ZO_PreHook: <T extends object>(
    this: void,
    target: T,
    methodName: string,
    hook: (this: void, ...args: never[]) => unknown
  ) => undefined

  interface ZoObjectClass {
    Subclass: <T = object>(this: ZoObjectClass) => T
    New: <T = object>(this: void, self: object) => T
  }
  const ZO_Object: ZoObjectClass

  interface ChatAutoCompleteWidget {
    enabled?: boolean
    [key: string]: unknown
  }

  interface ChatTextEntry {
    targetAutoComplete: ChatAutoCompleteWidget
    slashCommandAutoComplete: ChatAutoCompleteWidget
    AutoCompleteTarget: (this: ChatTextEntry, text: string) => undefined
    CloseAutoComplete: (this: ChatTextEntry) => undefined
    [key: string]: unknown
  }

  interface ChatSystem {
    textEntry: ChatTextEntry
    ignoreTextEntryChangedEvent?: boolean
    [key: string]: unknown
  }

  const KEYBOARD_CHAT_SYSTEM: ChatSystem | undefined
  const GAMEPAD_CHAT_SYSTEM: ChatSystem | undefined

  interface ChatSystemHandle {
    StartTextEntry: (
      this: ChatSystemHandle,
      text: string,
      channel?: number,
      target?: string,
      keepOpenAfter?: boolean
    ) => undefined
  }
  const ZO_GetChatSystem: (this: void) => ChatSystemHandle

  interface ChannelSwitchEntry {
    id: number
    name: string
    dynamicName?: boolean
  }

  const ZO_ChatSystem_GetChannelSwitchLookupTable: (
    this: void
  ) => Record<string, ChannelSwitchEntry>

  const GetTopMatchesByLevenshteinSubStringScore: (
    this: void,
    list: object,
    searchString: string,
    minScore: number,
    maxResults: number | undefined,
    returnList: boolean
  ) => AutoCompleteProvider["results"][] | undefined

  const SI_SLASH_SCRIPT: number
  const SI_SLASH_CHATLOG: number
  const SI_SLASH_GROUP_INVITE: number
  const SI_SLASH_JUMP_TO_LEADER: number
  const SI_SLASH_JUMP_TO_GROUP_MEMBER: number
  const SI_SLASH_JUMP_TO_FRIEND: number
  const SI_SLASH_JUMP_TO_GUILD_MEMBER: number
  const SI_SLASH_RELOADUI: number
  const SI_SLASH_PLAYED_TIME: number
  const SI_SLASH_READY_CHECK: number
  const SI_SLASH_DUEL_INVITE: number
  const SI_SLASH_LOGOUT: number
  const SI_SLASH_CAMP: number
  const SI_SLASH_QUIT: number
  const SI_SLASH_FPS: number
  const SI_SLASH_LATENCY: number
  const SI_SLASH_STUCK: number
  const SI_SLASH_REPORT_BUG: number
  const SI_SLASH_REPORT_FEEDBACK: number
  const SI_SLASH_REPORT_HELP: number
  const SI_SLASH_REPORT_CHAT: number
  const SI_SLASH_ENCOUNTER_LOG: number
}

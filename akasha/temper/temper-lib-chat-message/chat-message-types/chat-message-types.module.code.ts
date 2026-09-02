export interface Settings {
  version: number
  timePrefixEnabled: boolean
  timePrefixOnRegularChat: boolean
  timePrefixFormat: string
  tagPrefixMode: number
  historyEnabled: boolean
  historyMaxAge: number
}

export type HistoryEntry = unknown[]

export type Reformatter = (
  this: void,
  linkStyle: number,
  linkType: string,
  data: string,
  displayText: string
) => string

export interface ChatProxy {
  longTag: string
  shortTag: string
  enabled: boolean
  tagColor?: string
  SetTagColor: (this: ChatProxy, color: string | ZoColorDef) => ChatProxy
  GetTag: (this: ChatProxy) => string
  Print: (this: ChatProxy, message: string) => void
  Printf: (this: ChatProxy, formatString: string, ...args: unknown[]) => void
  SetEnabled: (this: ChatProxy, enabled: boolean) => void
}

export interface Lib {
  defaultSettings: Settings
  chatHistory: HistoryEntry[]
  chatHistoryActive: boolean
  registeredChatLinks: Record<string, Reformatter>
  settings?: Settings
  saveDataKey?: string
  nextEventTimeStamp?: number

  UNKNOWN_LINK_TYPE: string
  TIME_FORMATS: string[]
  TAG_PREFIX_OFF: number
  TAG_PREFIX_LONG: number
  TAG_PREFIX_SHORT: number

  Create?: (this: void, longTag: string, shortTag: string) => ChatProxy

  RegisterCustomChatLink: (this: Lib, linkType: string, optionalReformatter?: Reformatter) => void
  ClearChat: (this: Lib) => void
  ClearHistory: (this: Lib) => void
  GetHistory: (this: Lib) => HistoryEntry[]
  SetTimePrefixEnabled: (this: Lib, enabled: boolean) => void
  IsTimePrefixEnabled: (this: Lib) => boolean
  SetRegularChatMessageTimePrefixEnabled: (this: Lib, enabled: boolean) => void
  IsRegularChatMessageTimePrefixEnabled: (this: Lib) => boolean
  SetTimePrefixFormat: (this: Lib, format: string) => void
  GetTimePrefixFormat: (this: Lib) => string
  SetTagPrefixMode: (this: Lib, mode: number) => void
  GetTagPrefixMode: (this: Lib) => number
  SetShortTagPrefixEnabled: (this: Lib, enabled: boolean) => void
  IsShortTagPrefixEnabled: (this: Lib) => boolean
  SetChatHistoryEnabled: (this: Lib, enabled: boolean) => void
  IsChatHistoryEnabled: (this: Lib) => boolean
  IsChatHistoryActive: (this: Lib) => boolean
  SetChatHistoryMaxAge: (this: Lib, maxAge: number) => void
  GetChatHistoryMaxAge: (this: Lib) => number
}

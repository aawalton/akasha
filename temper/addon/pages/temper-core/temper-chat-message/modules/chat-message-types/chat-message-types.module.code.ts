import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"

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

type Reformatter = (
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

export interface ChatMessageApi {
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

  RegisterCustomChatLink: (
    this: ChatMessageApi,
    linkType: string,
    optionalReformatter?: Reformatter
  ) => void
  ClearChat: (this: ChatMessageApi) => void
  ClearHistory: (this: ChatMessageApi) => void
  GetHistory: (this: ChatMessageApi) => HistoryEntry[]
  SetTimePrefixEnabled: (this: ChatMessageApi, enabled: boolean) => void
  IsTimePrefixEnabled: (this: ChatMessageApi) => boolean
  SetRegularChatMessageTimePrefixEnabled: (this: ChatMessageApi, enabled: boolean) => void
  IsRegularChatMessageTimePrefixEnabled: (this: ChatMessageApi) => boolean
  SetTimePrefixFormat: (this: ChatMessageApi, format: string) => void
  GetTimePrefixFormat: (this: ChatMessageApi) => string
  SetTagPrefixMode: (this: ChatMessageApi, mode: number) => void
  GetTagPrefixMode: (this: ChatMessageApi) => number
  SetShortTagPrefixEnabled: (this: ChatMessageApi, enabled: boolean) => void
  IsShortTagPrefixEnabled: (this: ChatMessageApi) => boolean
  SetChatHistoryEnabled: (this: ChatMessageApi, enabled: boolean) => void
  IsChatHistoryEnabled: (this: ChatMessageApi) => boolean
  IsChatHistoryActive: (this: ChatMessageApi) => boolean
  SetChatHistoryMaxAge: (this: ChatMessageApi, maxAge: number) => void
  GetChatHistoryMaxAge: (this: ChatMessageApi) => number
}

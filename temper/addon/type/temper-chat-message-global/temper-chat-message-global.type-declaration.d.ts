type TemperChatMessageReformatter = (
  this: void,
  linkStyle: number,
  linkType: string,
  data: string,
  displayText: string
) => string

interface TemperChatMessageProxy {
  SetTagColor: (this: TemperChatMessageProxy, color: string | ZoColorDef) => TemperChatMessageProxy
  Print: (this: TemperChatMessageProxy, message: string) => void
  Printf: (this: TemperChatMessageProxy, formatString: string, ...args: unknown[]) => void
  SetEnabled: (this: TemperChatMessageProxy, enabled: boolean) => void
}

interface TemperChatMessage {
  (this: void, longTag: string, shortTag: string): TemperChatMessageProxy

  Create: (this: void, longTag: string, shortTag: string) => TemperChatMessageProxy

  UNKNOWN_LINK_TYPE: string
  TIME_FORMATS: string[]
  TAG_PREFIX_OFF: number
  TAG_PREFIX_LONG: number
  TAG_PREFIX_SHORT: number

  RegisterCustomChatLink: (
    this: TemperChatMessage,
    linkType: string,
    optionalReformatter?: TemperChatMessageReformatter
  ) => void
  ClearChat: (this: TemperChatMessage) => void
  ClearHistory: (this: TemperChatMessage) => void
  GetHistory: (this: TemperChatMessage) => unknown[]
  SetTimePrefixEnabled: (this: TemperChatMessage, enabled: boolean) => void
  IsTimePrefixEnabled: (this: TemperChatMessage) => boolean
  SetRegularChatMessageTimePrefixEnabled: (this: TemperChatMessage, enabled: boolean) => void
  IsRegularChatMessageTimePrefixEnabled: (this: TemperChatMessage) => boolean
  SetTimePrefixFormat: (this: TemperChatMessage, format: string) => void
  GetTimePrefixFormat: (this: TemperChatMessage) => string
  SetTagPrefixMode: (this: TemperChatMessage, mode: number) => void
  GetTagPrefixMode: (this: TemperChatMessage) => number
  SetShortTagPrefixEnabled: (this: TemperChatMessage, enabled: boolean) => void
  IsShortTagPrefixEnabled: (this: TemperChatMessage) => boolean
  SetChatHistoryEnabled: (this: TemperChatMessage, enabled: boolean) => void
  IsChatHistoryEnabled: (this: TemperChatMessage) => boolean
  IsChatHistoryActive: (this: TemperChatMessage) => boolean
  SetChatHistoryMaxAge: (this: TemperChatMessage, maxAge: number) => void
  GetChatHistoryMaxAge: (this: TemperChatMessage) => number
}

declare const TemperChatMessage: TemperChatMessage | undefined

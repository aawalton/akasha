type LibChatMessageReformatter = (
  this: void,
  linkStyle: number,
  linkType: string,
  data: string,
  displayText: string
) => string

interface LibChatMessageProxy {
  SetTagColor: (this: LibChatMessageProxy, color: string | ZoColorDef) => LibChatMessageProxy
  Print: (this: LibChatMessageProxy, message: string) => void
  Printf: (this: LibChatMessageProxy, formatString: string, ...args: unknown[]) => void
  SetEnabled: (this: LibChatMessageProxy, enabled: boolean) => void
}

interface LibChatMessage {
  (this: void, longTag: string, shortTag: string): LibChatMessageProxy

  Create: (this: void, longTag: string, shortTag: string) => LibChatMessageProxy

  UNKNOWN_LINK_TYPE: string
  TIME_FORMATS: string[]
  TAG_PREFIX_OFF: number
  TAG_PREFIX_LONG: number
  TAG_PREFIX_SHORT: number

  RegisterCustomChatLink: (
    this: LibChatMessage,
    linkType: string,
    optionalReformatter?: LibChatMessageReformatter
  ) => void
  ClearChat: (this: LibChatMessage) => void
  ClearHistory: (this: LibChatMessage) => void
  GetHistory: (this: LibChatMessage) => unknown[]
  SetTimePrefixEnabled: (this: LibChatMessage, enabled: boolean) => void
  IsTimePrefixEnabled: (this: LibChatMessage) => boolean
  SetRegularChatMessageTimePrefixEnabled: (this: LibChatMessage, enabled: boolean) => void
  IsRegularChatMessageTimePrefixEnabled: (this: LibChatMessage) => boolean
  SetTimePrefixFormat: (this: LibChatMessage, format: string) => void
  GetTimePrefixFormat: (this: LibChatMessage) => string
  SetTagPrefixMode: (this: LibChatMessage, mode: number) => void
  GetTagPrefixMode: (this: LibChatMessage) => number
  SetShortTagPrefixEnabled: (this: LibChatMessage, enabled: boolean) => void
  IsShortTagPrefixEnabled: (this: LibChatMessage) => boolean
  SetChatHistoryEnabled: (this: LibChatMessage, enabled: boolean) => void
  IsChatHistoryEnabled: (this: LibChatMessage) => boolean
  IsChatHistoryActive: (this: LibChatMessage) => boolean
  SetChatHistoryMaxAge: (this: LibChatMessage, maxAge: number) => void
  GetChatHistoryMaxAge: (this: LibChatMessage) => number
}

declare const LibChatMessage: LibChatMessage | undefined

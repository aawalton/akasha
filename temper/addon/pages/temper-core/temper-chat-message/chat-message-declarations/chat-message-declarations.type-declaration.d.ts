type ChatMessageFormatter = (this: void, ...args: unknown[]) => LuaMultiReturn<unknown[]>

type ChatFormatterTable = Record<string | number, ChatMessageFormatter>

interface ChatWindowBuffer {
  Clear: () => void
}

interface ChatWindowPool {
  GetActiveObjects: () => Record<number, ChatWindow>
}

interface ChatEditControl {
  SetAllowMarkupType: (markupType: number) => void
}

declare const ZO_VALID_LINK_TYPES_CHAT: Record<string, boolean>

declare let TemperChatMessageSettings: Record<string, unknown> | undefined

declare let TemperChatMessageHistory: Record<string, unknown> | undefined

declare const TEMPER_CHATMESSAGE_UNKNOWN_DESCRIPTION: number

declare const ZO_ChatSystem_GetEventCategoryMappings: (
  this: void
) => LuaMultiReturn<[unknown, Record<string, number>]>

declare const ZO_LinkHandler_CreateLinkWithoutBrackets: (
  this: void,
  text: string,
  color: unknown,
  linkType: string,
  ...data: unknown[]
) => string

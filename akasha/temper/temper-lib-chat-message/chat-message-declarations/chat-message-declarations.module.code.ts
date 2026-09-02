declare global {
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

  const ZO_VALID_LINK_TYPES_CHAT: Record<string, boolean>

  let LibChatMessageSettings: Record<string, unknown> | undefined

  let LibChatMessageHistory: Record<string, unknown> | undefined

  const LIB_CHATMESSAGE_UNKNOWN_DESCRIPTION: number

  const ZO_ChatSystem_GetEventCategoryMappings: (
    this: void
  ) => LuaMultiReturn<[unknown, Record<string, number>]>

  const ZO_LinkHandler_CreateLinkWithoutBrackets: (
    this: void,
    text: string,
    color: unknown,
    linkType: string,
    ...data: unknown[]
  ) => string

  interface ChatRouter {
    GetRegisteredMessageFormatters: () => ChatFormatterTable
    RegisterMessageFormatter: (key: string, formatter: ChatMessageFormatter) => void
    registeredMessageFormatters: ChatFormatterTable
  }

  interface ChatWindow {
    buffer: ChatWindowBuffer
  }

  interface KeyboardChatSystem {
    windowPool: ChatWindowPool
    GetEditControl: () => ChatEditControl
  }
}

export {}

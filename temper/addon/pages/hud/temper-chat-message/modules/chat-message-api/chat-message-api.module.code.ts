import {
  TAG_PREFIX_LONG,
  TAG_PREFIX_OFF,
  TAG_PREFIX_SHORT,
  TIME_FORMAT_AUTO,
  TIME_FORMATS,
  UNKNOWN_LINK_TYPE,
} from "akasha/temper/addon/pages/hud/temper-chat-message/modules/chat-message-constants/chat-message-constants.module.code.ts"
import type {
  ChatMessageApi,
  Settings,
} from "akasha/temper/addon/pages/hud/temper-chat-message/modules/chat-message-types/chat-message-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-chat-message/chat-message-declarations/chat-message-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

const DEFAULT_SETTINGS: Settings = {
  version: 1,
  timePrefixEnabled: false,
  timePrefixOnRegularChat: true,
  timePrefixFormat: TIME_FORMAT_AUTO,
  tagPrefixMode: TAG_PREFIX_LONG,
  historyEnabled: false,
  historyMaxAge: 3600,
}

function defaultReformatter(
  this: void,
  linkStyle: number,
  linkType: string,
  data: string,
  displayText: string
): string {
  return ZO_LinkHandler_CreateLink(displayText, undefined, linkType, linkStyle, data)
}

export const CHAT_MESSAGE_API: ChatMessageApi = {
  defaultSettings: DEFAULT_SETTINGS,
  chatHistory: [],
  chatHistoryActive: true,
  registeredChatLinks: {},

  UNKNOWN_LINK_TYPE,
  TIME_FORMATS,
  TAG_PREFIX_OFF,
  TAG_PREFIX_LONG,
  TAG_PREFIX_SHORT,

  RegisterCustomChatLink(this: ChatMessageApi, linkType, optionalReformatter) {
    if (optionalReformatter !== undefined && type(optionalReformatter) !== "function") {
      error("Reformatter has to be a function")
    }
    this.registeredChatLinks[linkType] = optionalReformatter ?? defaultReformatter
    ZO_VALID_LINK_TYPES_CHAT[linkType] = true
  },

  ClearChat(this: ChatMessageApi) {
    if (!IsKeyboardUISupported()) {
      return
    }
    const activeWindows = KEYBOARD_CHAT_SYSTEM.windowPool.GetActiveObjects()
    for (const [, window] of pairs(activeWindows)) {
      window.buffer.Clear()
    }
  },

  ClearHistory(this: ChatMessageApi) {
    this.chatHistory = []
    if (this.saveDataKey !== undefined && LibChatMessageHistory !== undefined) {
      LibChatMessageHistory[this.saveDataKey] = this.chatHistory
    }
  },

  GetHistory(this: ChatMessageApi) {
    return this.chatHistory
  },

  SetTimePrefixEnabled(this: ChatMessageApi, enabled) {
    if (this.settings !== undefined) {
      this.settings.timePrefixEnabled = enabled
    }
  },

  IsTimePrefixEnabled(this: ChatMessageApi) {
    if (this.settings !== undefined) {
      return this.settings.timePrefixEnabled
    }
    return this.defaultSettings.timePrefixEnabled
  },

  SetRegularChatMessageTimePrefixEnabled(this: ChatMessageApi, enabled) {
    if (this.settings !== undefined) {
      this.settings.timePrefixOnRegularChat = enabled
    }
  },

  IsRegularChatMessageTimePrefixEnabled(this: ChatMessageApi) {
    if (this.settings !== undefined) {
      return this.settings.timePrefixOnRegularChat
    }
    return this.defaultSettings.timePrefixOnRegularChat
  },

  SetTimePrefixFormat(this: ChatMessageApi, format) {
    if (this.settings !== undefined) {
      this.settings.timePrefixFormat = format
    }
  },

  GetTimePrefixFormat(this: ChatMessageApi) {
    if (this.settings !== undefined) {
      return this.settings.timePrefixFormat
    }
    return this.defaultSettings.timePrefixFormat
  },

  SetTagPrefixMode(this: ChatMessageApi, mode) {
    if (this.settings !== undefined) {
      this.settings.tagPrefixMode = mode
    }
  },

  GetTagPrefixMode(this: ChatMessageApi) {
    if (this.settings !== undefined) {
      return this.settings.tagPrefixMode
    }
    return this.defaultSettings.tagPrefixMode
  },

  SetShortTagPrefixEnabled(this: ChatMessageApi, enabled) {
    this.SetTagPrefixMode(enabled ? TAG_PREFIX_SHORT : TAG_PREFIX_LONG)
  },

  IsShortTagPrefixEnabled(this: ChatMessageApi) {
    return this.GetTagPrefixMode() === TAG_PREFIX_SHORT
  },

  SetChatHistoryEnabled(this: ChatMessageApi, enabled) {
    if (this.settings !== undefined) {
      this.settings.historyEnabled = enabled
    }
  },

  IsChatHistoryEnabled(this: ChatMessageApi) {
    if (this.settings !== undefined) {
      return this.settings.historyEnabled
    }
    return this.defaultSettings.historyEnabled
  },

  IsChatHistoryActive(this: ChatMessageApi) {
    return this.chatHistoryActive
  },

  SetChatHistoryMaxAge(this: ChatMessageApi, maxAge) {
    if (this.settings !== undefined) {
      this.settings.historyMaxAge = maxAge
    }
  },

  GetChatHistoryMaxAge(this: ChatMessageApi) {
    if (this.settings !== undefined) {
      return this.settings.historyMaxAge
    }
    return this.defaultSettings.historyMaxAge
  },
}

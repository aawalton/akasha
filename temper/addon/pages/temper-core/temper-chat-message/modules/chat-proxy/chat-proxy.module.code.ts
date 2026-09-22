import { CHAT_MESSAGE_API } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-api/chat-message-api.module.code.ts"
import { asZoColorDef } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-casts/chat-message-casts.module.code.ts"
import {
  CHAT_MESSAGE_GLOBAL,
  COLOR_FORMAT,
  TAG_FORMAT,
  TAG_PREFIX_SHORT,
} from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-constants/chat-message-constants.module.code.ts"
import type {
  ChatMessageApi,
  ChatProxy,
} from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-types/chat-message-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"

export function createChatProxy(this: void, longTag: string, shortTag: string): ChatProxy {
  const proxy: ChatProxy = {
    longTag,
    shortTag,
    enabled: true,

    SetTagColor(this: ChatProxy, color) {
      if (this.enabled) {
        if (type(color) === "table") {
          this.tagColor = asZoColorDef(color).ToHex()
        } else {
          this.tagColor = color as string
        }
      }
      return this
    },

    GetTag(this: ChatProxy) {
      const useShort = CHAT_MESSAGE_API.settings?.tagPrefixMode === TAG_PREFIX_SHORT
      let tag = string.format(TAG_FORMAT, useShort ? this.shortTag : this.longTag)
      if (this.tagColor !== undefined) {
        tag = string.format(COLOR_FORMAT, this.tagColor, tag)
        this.tagColor = undefined
      }
      return tag
    },

    Print(this: ChatProxy, message) {
      if (!this.enabled) {
        return
      }
      const tag = this.GetTag()
      CHAT_ROUTER.FormatAndAddChatMessage(CHAT_MESSAGE_GLOBAL, tag, message)
    },

    Printf(this: ChatProxy, formatString, ...args) {
      if (!this.enabled) {
        return
      }
      const tag = this.GetTag()
      CHAT_ROUTER.FormatAndAddChatMessage(
        CHAT_MESSAGE_GLOBAL,
        tag,
        string.format(formatString, ...args)
      )
    },

    SetEnabled(this: ChatProxy, enabled) {
      this.enabled = enabled
    },
  }
  return proxy
}

export function installChatProxy(this: void): undefined {
  CHAT_MESSAGE_API.Create = createChatProxy
  setmetatable(CHAT_MESSAGE_API, {
    __call(this: ChatMessageApi, ...args: unknown[]): ChatProxy {
      const create = CHAT_MESSAGE_API.Create ?? createChatProxy
      return create(args[0] as string, args[1] as string)
    },
  })
}

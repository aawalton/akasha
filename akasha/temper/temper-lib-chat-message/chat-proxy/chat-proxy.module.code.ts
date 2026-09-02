import { asZoColorDef } from "../chat-message-casts/chat-message-casts.module.code.ts"
import {
  COLOR_FORMAT,
  LIB_IDENTIFIER,
  TAG_FORMAT,
  TAG_PREFIX_SHORT,
} from "../chat-message-constants/chat-message-constants.module.code.ts"
import { LIB } from "../chat-message-lib/chat-message-lib.module.code.ts"
import type { ChatProxy, Lib } from "../chat-message-types/chat-message-types.module.code.ts"

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
      const useShort = LIB.settings?.tagPrefixMode === TAG_PREFIX_SHORT
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
      CHAT_ROUTER.FormatAndAddChatMessage(LIB_IDENTIFIER, tag, message)
    },

    Printf(this: ChatProxy, formatString, ...args) {
      if (!this.enabled) {
        return
      }
      const tag = this.GetTag()
      CHAT_ROUTER.FormatAndAddChatMessage(LIB_IDENTIFIER, tag, string.format(formatString, ...args))
    },

    SetEnabled(this: ChatProxy, enabled) {
      this.enabled = enabled
    },
  }
  return proxy
}

export function installChatProxy(this: void): undefined {
  LIB.Create = createChatProxy
  setmetatable(LIB, {
    __call(this: Lib, ...args: unknown[]): ChatProxy {
      const create = LIB.Create ?? createChatProxy
      return create(args[0] as string, args[1] as string)
    },
  })
}

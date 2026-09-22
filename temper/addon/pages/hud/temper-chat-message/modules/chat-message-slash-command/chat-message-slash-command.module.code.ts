import { CHAT_MESSAGE_API } from "akasha/temper/addon/pages/hud/temper-chat-message/modules/chat-message-api/chat-message-api.module.code.ts"
import {
  REVERSE_TIME_FORMAT_MAPPING,
  TAG_PREFIX_LONG,
  TAG_PREFIX_OFF,
  TAG_PREFIX_SHORT,
  TIME_FORMAT_MAPPING,
} from "akasha/temper/addon/pages/hud/temper-chat-message/modules/chat-message-constants/chat-message-constants.module.code.ts"
import type { ChatProxy } from "akasha/temper/addon/pages/hud/temper-chat-message/modules/chat-message-types/chat-message-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function registerSlashCommand(this: void, chat: ChatProxy): undefined {
  SLASH_COMMANDS["/chatmessage"] = (params: string): undefined => {
    let handled = false
    const [commandRaw, argRaw] = zo_strsplit(" ", params)
    const command = string.lower(commandRaw ?? "")
    const arg = string.lower(argRaw ?? "")

    if (command === "time") {
      if (arg === "on") {
        CHAT_MESSAGE_API.SetTimePrefixEnabled(true)
        chat.Print("Enabled time prefix")
      } else if (arg === "off") {
        CHAT_MESSAGE_API.SetTimePrefixEnabled(false)
        chat.Print("Disabled time prefix")
      } else {
        const enabled = CHAT_MESSAGE_API.IsTimePrefixEnabled()
        chat.Printf("Time prefix is currently %s", enabled ? "enabled" : "disabled")
      }
      handled = true
    } else if (command === "chat") {
      if (arg === "on") {
        CHAT_MESSAGE_API.SetRegularChatMessageTimePrefixEnabled(true)
        chat.Print("Enabled player chat message time prefix")
      } else if (arg === "off") {
        CHAT_MESSAGE_API.SetRegularChatMessageTimePrefixEnabled(false)
        chat.Print("Disabled player chat message time prefix")
      } else {
        const enabled = CHAT_MESSAGE_API.IsRegularChatMessageTimePrefixEnabled()
        chat.Printf(
          "Player chat message time prefix is currently %s",
          enabled ? "enabled" : "disabled"
        )
      }
      handled = true
    } else if (command === "format") {
      const mapped = TIME_FORMAT_MAPPING[arg]
      if (mapped !== undefined) {
        CHAT_MESSAGE_API.SetTimePrefixFormat(mapped)
        chat.Printf("Set time prefix to %s format", arg)
      } else {
        let format = CHAT_MESSAGE_API.GetTimePrefixFormat()
        const label = REVERSE_TIME_FORMAT_MAPPING[format]
        if (label !== undefined) {
          format = label
        }
        chat.Printf("Time prefix format is currently set to %s", format)
      }
      handled = true
    } else if (command === "tag") {
      if (arg === "short") {
        CHAT_MESSAGE_API.SetTagPrefixMode(TAG_PREFIX_SHORT)
        chat.Print("Set tag prefix to short format")
      } else if (arg === "long") {
        CHAT_MESSAGE_API.SetTagPrefixMode(TAG_PREFIX_LONG)
        chat.Print("Set tag prefix to long format")
      } else if (arg === "off") {
        CHAT_MESSAGE_API.SetTagPrefixMode(TAG_PREFIX_OFF)
        chat.Print("Disabled showing a tag prefix")
      } else {
        const mode = CHAT_MESSAGE_API.GetTagPrefixMode()
        if (mode === TAG_PREFIX_OFF) {
          chat.Print("Tag prefix is currently disabled")
        } else {
          const isShort = mode === TAG_PREFIX_SHORT
          chat.Printf("Tag prefix is currently set to %s format", isShort ? "short" : "long")
        }
      }
      handled = true
    } else if (command === "history") {
      if (arg === "on") {
        CHAT_MESSAGE_API.SetChatHistoryEnabled(true)
        chat.Print("Set chat history enabled on the next UI load")
      } else if (arg === "off") {
        CHAT_MESSAGE_API.SetChatHistoryEnabled(false)
        chat.Print("Set chat history disabled on the next UI load")
      } else {
        const active = CHAT_MESSAGE_API.IsChatHistoryActive()
        const enabled = CHAT_MESSAGE_API.IsChatHistoryEnabled()
        chat.Printf(
          "Chat history is currently %s and will be %s on the next UI load",
          active ? "active" : "inactive",
          enabled ? "enabled" : "disabled"
        )
      }
      handled = true
    } else if (command === "age") {
      const parsed = tonumber(arg)
      if (parsed !== undefined && parsed > 0) {
        CHAT_MESSAGE_API.SetChatHistoryMaxAge(parsed)
        chat.Printf("Set maximum history age to %d seconds", parsed)
      } else {
        const maxAge = CHAT_MESSAGE_API.GetChatHistoryMaxAge()
        chat.Printf("Maximum history age currently set to %d seconds", maxAge)
      }
      handled = true
    }

    if (!handled) {
      const out: string[] = []
      out[out.length] = "/chatmessage <command> [argument]"
      out[out.length] =
        "<time>|u129%:0:  :|u[on/off]|u286%:0:       :|uEnables or disables the time prefix"
      out[out.length] =
        "<chat>|u125%:0:  :|u[on/off]|u288%:0:       :|uShow time prefix on regular chat"
      out[out.length] =
        "<format>|u62%:0: :|u[auto/12h/24h]|u68%:0:  :|uChanges the time format used"
      out[out.length] =
        "<tag>|u165%:0:   :|u[off/short/long]|u50%:0::|uControls how a message is tagged"
      out[out.length] =
        "<history>|u50%:0::|u[on/off]|u286%:0:       :|uRestore old chat after login"
      out[out.length] =
        "<age>|u147%:0:   :|u[seconds]|u200%:0:      :|uThe maximum age of restored chat"
      out[out.length] = "Example: /chatmessage tag short"
      chat.Print(table.concat(out, "\n"))
    }
  }
}

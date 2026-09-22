import { CHAT_MESSAGE_API } from "akasha/temper/addon/pages/hud/temper-chat-message/modules/chat-message-api/chat-message-api.module.code.ts"
import {
  MAX_HISTORY_LENGTH,
  TRIMMED_HISTORY_LENGTH,
} from "akasha/temper/addon/pages/hud/temper-chat-message/modules/chat-message-constants/chat-message-constants.module.code.ts"
import type { HistoryEntry } from "akasha/temper/addon/pages/hud/temper-chat-message/modules/chat-message-types/chat-message-types.module.code.ts"
import { writeToSavedVariable } from "akasha/temper/addon/pages/hud/temper-chat-message/modules/chat-saved-data/chat-saved-data.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

export function getFormattedTime(this: void, timeStamp: number): string {
  const settings = CHAT_MESSAGE_API.settings ?? CHAT_MESSAGE_API.defaultSettings
  return os.date(settings.timePrefixFormat, timeStamp) as string
}

export function getTimeStampForEvent(this: void): LuaMultiReturn<[number, boolean]> {
  if (CHAT_MESSAGE_API.nextEventTimeStamp !== undefined) {
    return $multi(CHAT_MESSAGE_API.nextEventTimeStamp, true)
  }
  return $multi(GetTimeStamp(), false)
}

export function storeChatEvent(
  this: void,
  timeStamp: number,
  eventType: string | number,
  ...args: unknown[]
): undefined {
  if (!CHAT_MESSAGE_API.chatHistoryActive) {
    return
  }
  const entry: HistoryEntry = [timeStamp, eventType]
  const count = select("#", ...args)
  for (let i = 1; i <= count; i += 1) {
    const [value] = select(i, ...args)
    entry[entry.length] = writeToSavedVariable(value)
  }

  let chatHistory = CHAT_MESSAGE_API.chatHistory
  chatHistory[chatHistory.length] = entry
  if (chatHistory.length > MAX_HISTORY_LENGTH) {
    const newHistory: HistoryEntry[] = []
    const startIndex = chatHistory.length - TRIMMED_HISTORY_LENGTH
    for (let i = startIndex; i <= chatHistory.length; i += 1) {
      const item = chatHistory[i - 1]
      if (item !== undefined) {
        newHistory[newHistory.length] = item
      }
    }
    chatHistory = newHistory
  }
}

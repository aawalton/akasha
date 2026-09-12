import type { ImessageMessage } from "akasha/alan/harness/imessage/modules/chat-db/chat-db.module.code.ts"

export function message(over: Partial<ImessageMessage>): ImessageMessage {
  return {
    rowid: 1,
    guid: "g",
    text: "hi",
    isFromMe: false,
    unixSeconds: 0,
    handleId: null,
    chatIdentifier: null,
    chatDisplayName: null,
    ...over,
  }
}

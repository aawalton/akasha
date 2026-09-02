import "../chat-message-declarations/chat-message-declarations.module.code.ts"
import { asGlobalTable } from "../chat-message-casts/chat-message-casts.module.code.ts"
import { LIB_IDENTIFIER } from "../chat-message-constants/chat-message-constants.module.code.ts"
import { LIB } from "../chat-message-lib/chat-message-lib.module.code.ts"
import type { Lib } from "../chat-message-types/chat-message-types.module.code.ts"

declare global {
  var LibChatMessage: Lib
}

const glob = asGlobalTable(globalThis)
if (glob[LIB_IDENTIFIER] !== undefined) {
  error(`${LIB_IDENTIFIER} is already loaded`)
}

globalThis.LibChatMessage = LIB

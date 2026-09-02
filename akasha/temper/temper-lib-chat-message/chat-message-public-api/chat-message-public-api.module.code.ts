import type { GlobalTable } from "../chat-message-casts/chat-message-casts.module.code.ts"

import { LIB_IDENTIFIER } from "../chat-message-constants/chat-message-constants.module.code.ts"
import { LIB } from "../chat-message-lib/chat-message-lib.module.code.ts"

const glob = globalThis as GlobalTable
if (glob[LIB_IDENTIFIER] !== undefined) {
  error(`${LIB_IDENTIFIER} is already loaded`)
}

glob[LIB_IDENTIFIER] = LIB

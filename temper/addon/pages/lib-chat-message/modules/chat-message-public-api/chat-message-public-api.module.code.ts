import type { GlobalTable } from "akasha/temper/addon/pages/lib-chat-message/modules/chat-message-casts/chat-message-casts.module.code.ts"
import { LIB_IDENTIFIER } from "akasha/temper/addon/pages/lib-chat-message/modules/chat-message-constants/chat-message-constants.module.code.ts"
import { LIB } from "akasha/temper/addon/pages/lib-chat-message/modules/chat-message-lib/chat-message-lib.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

const glob = globalThis as GlobalTable
if (glob[LIB_IDENTIFIER] !== undefined) {
  error(`${LIB_IDENTIFIER} is already loaded`)
}

glob[LIB_IDENTIFIER] = LIB

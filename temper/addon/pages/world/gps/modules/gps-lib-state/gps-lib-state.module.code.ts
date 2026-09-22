import { asLib } from "akasha/temper/addon/pages/world/gps/modules/gps-casts/gps-casts.module.code.ts"
import {
  BLACKREACH_ROOT_MAP_INDEX,
  CHAT_SHORT_TAG,
  LIB_EVENT_STATE_CHANGED,
  LIB_IDENTIFIER,
  TAMRIEL_MAP_INDEX,
} from "akasha/temper/addon/pages/world/gps/modules/gps-constants/gps-constants.module.code.ts"
import type {
  InternalState,
  Lib,
} from "akasha/temper/addon/pages/world/gps/modules/gps-types/gps-types.module.code.ts"
import { createLogger } from "akasha/temper/addon/shared/log/modules/library-logger/library-logger.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-chat-message-global/temper-chat-message-global.type-declaration.d.ts"

function createChat(this: void): TemperChatMessageProxy {
  if (TemperChatMessage === undefined) {
    error(`${LIB_IDENTIFIER} requires TemperChatMessage`)
  }
  return TemperChatMessage(LIB_IDENTIFIER, CHAT_SHORT_TAG)
}

export const INTERNAL: InternalState = {
  logger: createLogger(LIB_IDENTIFIER),
  chat: createChat(),
  TAMRIEL_MAP_INDEX,
  BLACKREACH_ROOT_MAP_INDEX,
}

export const lib: Lib = asLib({
  internal: INTERNAL,
  LIB_EVENT_STATE_CHANGED,
})

import { CHAT_MESSAGE_API } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-api/chat-message-api.module.code.ts"
import type { GlobalTable } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-casts/chat-message-casts.module.code.ts"
import { CHAT_MESSAGE_GLOBAL } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-constants/chat-message-constants.module.code.ts"

const glob = globalThis as GlobalTable

glob[CHAT_MESSAGE_GLOBAL] = CHAT_MESSAGE_API

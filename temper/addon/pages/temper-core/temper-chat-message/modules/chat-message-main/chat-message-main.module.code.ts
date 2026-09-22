import "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-public-api/chat-message-public-api.module.code.ts"

import { installFormatters } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-formatters/chat-message-formatters.module.code.ts"
import { registerLifecycle } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-lifecycle/chat-message-lifecycle.module.code.ts"
import { registerUnknownLinkString } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-strings/chat-message-strings.module.code.ts"
import { installChatProxy } from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-proxy/chat-proxy.module.code.ts"

registerUnknownLinkString()
installFormatters()
installChatProxy()
registerLifecycle()

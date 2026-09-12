import type { MessageBody } from "akasha/agents/messaging/messages/properties/message-body.text-property.types.ts"
import type { MessageClaimedAt } from "akasha/agents/messaging/messages/properties/message-claimed-at.instant-property.types.ts"
import type { MessageFrom } from "akasha/agents/messaging/messages/properties/message-from.text-property.types.ts"
import type { MessageTo } from "akasha/agents/messaging/messages/properties/message-to.relation-property.types.ts"
import type { MessageWarrant } from "akasha/agents/messaging/messages/properties/message-warrant.select-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type Message = Page & {
  to: MessageTo
  from: MessageFrom
  warrant: MessageWarrant
  body: MessageBody
  claimedAt?: MessageClaimedAt
}

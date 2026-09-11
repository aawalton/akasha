import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { MessageBody } from "akasha/seat-system/messages/properties/message-body.text-property.types.ts"
import type { MessageClaimedAt } from "akasha/seat-system/messages/properties/message-claimed-at.instant-property.types.ts"
import type { MessageFrom } from "akasha/seat-system/messages/properties/message-from.text-property.types.ts"
import type { MessageTo } from "akasha/seat-system/messages/properties/message-to.relation-property.types.ts"
import type { MessageWarrant } from "akasha/seat-system/messages/properties/message-warrant.select-property.types.ts"

export type Message = Page & {
  to: MessageTo
  from: MessageFrom
  warrant: MessageWarrant
  body: MessageBody
  claimedAt?: MessageClaimedAt
}

import type { MessageBody } from "akasha/agent/message/properties/message-body.text-property.types.ts"
import type { MessageClaimedAt } from "akasha/agent/message/properties/message-claimed-at.instant-property.types.ts"
import type { MessageFrom } from "akasha/agent/message/properties/message-from.text-property.types.ts"
import type { MessageTo } from "akasha/agent/message/properties/message-to.relation-property.types.ts"
import type { MessageWarrant } from "akasha/agent/message/properties/message-warrant.select-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type Message = Page & {
  to: MessageTo
  from: MessageFrom
  warrant: MessageWarrant
  body: MessageBody
  claimedAt?: MessageClaimedAt
}

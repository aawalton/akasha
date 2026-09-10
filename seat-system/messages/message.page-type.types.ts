import type { Page } from "../../pages/page.page-type.types.ts"
import type { MessageBody } from "./properties/message-body.text-property.ts"
import type { MessageClaimedAt } from "./properties/message-claimed-at.instant-property.ts"
import type { MessageFrom } from "./properties/message-from.text-property.ts"
import type { MessageTo } from "./properties/message-to.relation-property.ts"
import type { MessageWarrant } from "./properties/message-warrant.select-property.ts"

export type Message = Page & {
  to: MessageTo
  from: MessageFrom
  warrant: MessageWarrant
  body: MessageBody
  claimedAt?: MessageClaimedAt
}

import type { AgentMessageBody } from "akasha/agent/message/properties/agent-message-body.text-property.types.ts"
import type { AgentMessageClaimedAt } from "akasha/agent/message/properties/agent-message-claimed-at.instant-property.types.ts"
import type { AgentMessageFrom } from "akasha/agent/message/properties/agent-message-from.text-property.types.ts"
import type { AgentMessageInjectedAt } from "akasha/agent/message/properties/agent-message-injected-at.instant-property.types.ts"
import type { AgentMessageTo } from "akasha/agent/message/properties/agent-message-to.relation-property.types.ts"
import type { AgentMessageWarrant } from "akasha/agent/message/properties/agent-message-warrant.select-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type AgentMessage = Page & {
  to: AgentMessageTo
  from: AgentMessageFrom
  warrant: AgentMessageWarrant
  body: AgentMessageBody
  claimedAt?: AgentMessageClaimedAt
  injectedAt?: AgentMessageInjectedAt
}

import type { Agent } from "akasha/agents/agent.page-type.types.ts"
import type { PrincipalSeatName } from "akasha/seat-system/seats/properties/principal-seat-name.relation-property.types.ts"
import type { DispatchedAs } from "akasha/seat-system/subagent-kinds/properties/dispatched-as.text-property.types.ts"
import type { AgentId } from "akasha/seat-system/subagents/properties/agent-id.text-property.types.ts"
import type { SubagentKind } from "akasha/seat-system/subagents/properties/subagent-kind.relation-property.types.ts"
import type { SubagentReturned } from "akasha/seat-system/subagents/properties/subagent-returned.boolean-property.types.ts"

export type Subagent = Agent & {
  principalSeatName: PrincipalSeatName
  dispatchedAs?: DispatchedAs
  subagentKind?: SubagentKind
  agentId: AgentId
  returned?: SubagentReturned
}

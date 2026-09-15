import type { Agent } from "akasha/agent/agent.page-type.types.ts"
import type { PrincipalSeatName } from "akasha/agent/properties/principal-seat-name.relation-property.types.ts"
import type { DispatchedAs } from "akasha/agent/subagent/kind/properties/dispatched-as.text-property.types.ts"
import type { AgentId } from "akasha/agent/subagent/properties/agent-id.text-property.types.ts"
import type { SubagentKind } from "akasha/agent/subagent/properties/subagent-kind.relation-property.types.ts"
import type { SubagentStarted } from "akasha/agent/subagent/properties/subagent-started.number-property.types.ts"
import type { SubagentStopped } from "akasha/agent/subagent/properties/subagent-stopped.boolean-property.types.ts"

export type Subagent = Agent & {
  principalSeatName: PrincipalSeatName
  dispatchedAs?: DispatchedAs
  subagentKind?: SubagentKind
  agentId: AgentId
  started?: SubagentStarted
  stopped?: SubagentStopped
}

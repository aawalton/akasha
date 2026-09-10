import type { Agent } from "../../agents/agent.page-type.types.ts"
import type { PrincipalSeatName } from "../seats/properties/principal-seat-name.relation-property.ts"
import type { DispatchedAs } from "../subagent-kinds/properties/dispatched-as.text-property.ts"
import type { AgentId } from "./properties/agent-id.text-property.ts"
import type { SubagentKind } from "./properties/subagent-kind.relation-property.ts"

export type Subagent = Agent & {
  principalSeatName: PrincipalSeatName
  dispatchedAs?: DispatchedAs
  subagentKind?: SubagentKind
  agentId: AgentId
}

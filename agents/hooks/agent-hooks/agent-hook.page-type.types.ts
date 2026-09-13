import type { Clearings } from "akasha/agents/hooks/agent-hooks/properties/clearings.file-property.types.ts"
import type { OverTools } from "akasha/agents/hooks/agent-hooks/properties/over-tools.text-property.types.ts"
import type { RunsAt } from "akasha/agents/hooks/agent-hooks/properties/runs-at.select-property.types.ts"
import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export type AgentHook = Module & {
  runsAt: RunsAt
  overTools?: OverTools
  clearings?: Clearings
}

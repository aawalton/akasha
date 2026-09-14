import type { Clearings } from "akasha/agent/hook/agent-hook/properties/clearings.file-property.types.ts"
import type { OverTools } from "akasha/agent/hook/agent-hook/properties/over-tools.text-property.types.ts"
import type { RunsAt } from "akasha/agent/hook/agent-hook/properties/runs-at.select-property.types.ts"
import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export type AgentHook = Module & {
  runsAt: RunsAt
  overTools?: OverTools
  clearings?: Clearings
}

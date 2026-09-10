import type { Module } from "../../code-system/modules/module.page-type.ts"
import type { OverTools } from "./properties/over-tools.text-property.ts"
import type { RunsAt } from "./properties/runs-at.text-property.ts"

export type AgentHook = Module & {
  runsAt: RunsAt
  overTools?: OverTools
}

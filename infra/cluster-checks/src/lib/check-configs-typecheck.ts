import type { CheckConfig } from "./check-configs-types"
import { TS_GRAPH_INPUT_POPULATION } from "./check-configs-types"

const PACKAGE_POPULATION = ["package"] as const

export const TYPECHECK_CHECKS: CheckConfig[] = [
  {
    name: "typecheck",
    dispatchNodeTypes: [...TS_GRAPH_INPUT_POPULATION, ...PACKAGE_POPULATION, "lock-file"],
    dispatchNodes: ["json-file:code:package.json"],
    backendOptions: {
      kubernetes: { resources: { requests: { cpu: "3" }, limits: { memory: "4Gi" } } },
    },
    commands: (ci) => [
      `cd ${ci.workspace} && bun infra/cluster-checks/src/typecheck-population.ts || exit 1`,
      `cd ${ci.workspace} && bunx @typescript/native-preview -b`,
    ],
  },
]

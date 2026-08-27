import type { CheckConfig } from "./check-configs-types"

export const PACKAGE_CHECKS: CheckConfig[] = [
  {
    name: "package-names",
    dispatchNodeTypes: ["package"],
    script: "infra/cluster-checks/src/checks/check-package-names.ts",
  },
  {
    name: "workspaces-mainseam",
    dispatchNodeTypes: ["package"],
    script: "infra/cluster-checks/src/checks/check-workspaces-mainseam.ts",
  },
]

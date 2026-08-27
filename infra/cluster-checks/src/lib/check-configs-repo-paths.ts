import { type CheckConfig, treeShaArgs } from "./check-configs-types"

export const REPO_PATH_CHECKS: CheckConfig[] = [
  {
    name: "repo-paths",
    alwaysRun: true,
    dispatchNodeTypes: ["md-file"],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-repo-paths.ts",
      "ts-file:code:infra/cluster-checks/src/lib/repo-path-resolver.ts",
      "ts-file:code:infra/cluster-checks/src/lib/ts-path-literals.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-repo-paths.ts",
    args: treeShaArgs,
  },
]

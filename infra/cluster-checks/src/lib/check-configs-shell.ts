import { IMAGES } from "../../../../tools/lib/workflow-dsl/images.ts"
import type { CheckConfig } from "./check-configs-types"

export const SHELL_CHECKS: CheckConfig[] = [
  {
    name: "shellcheck",
    image: IMAGES.UNIVERSAL,
    dispatchNodeTypes: ["sh-file"],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-shellcheck.ts",
      "ts-file:code:infra/cluster-checks/src/lib/shellcheck-violations.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-shellcheck.ts",
  },
]

import type { CheckConfig } from "./check-configs-types"

export const RAW_BYTE_CHECKS: CheckConfig[] = [
  {
    name: "no-raw-nul-bytes",
    alwaysRun: true,
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-no-raw-nul-bytes.ts",
      "ts-file:code:infra/cluster-checks/src/lib/raw-nul-bytes.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-no-raw-nul-bytes.ts",
  },
]

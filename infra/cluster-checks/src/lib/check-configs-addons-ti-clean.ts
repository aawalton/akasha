import type { CheckConfig } from "./check-configs-types"

export const ADDON_TI_CLEAN_CHECKS: CheckConfig[] = [
  {
    name: "ti-clean-source-zero",
    dispatchNodeTypes: [
      { kind: "ts-file", under: "packages/temper" },
      { kind: "json-file", under: "packages/temper/addons" },
    ],
    dispatchNodes: [
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-ti-clean-source-zero.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/ti-clean-source-zero.ts",
      "json-file:code:packages/temper/addons/territory.map.json",
    ],
    script: "packages/temper/shared/build-deploy/checks/src/check-ti-clean-source-zero.ts",
  },
]

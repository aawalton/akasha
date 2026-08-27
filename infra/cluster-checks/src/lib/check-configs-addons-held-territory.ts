import type { CheckConfig } from "./check-configs-types"

export const ADDON_HELD_TERRITORY_CHECKS: CheckConfig[] = [
  {
    name: "held-addon-structure",
    dispatchNodeTypes: [
      { kind: "ts-file", under: "packages/temper" },
      { kind: "json-file", under: "packages/temper" },
    ],
    dispatchNodes: [
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-held-addon-structure.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/held-addon-structure.ts",
      "json-file:code:packages/temper/addons/territory.map.json",
    ],
    script: "packages/temper/shared/build-deploy/checks/src/check-held-addon-structure.ts",
  },
]

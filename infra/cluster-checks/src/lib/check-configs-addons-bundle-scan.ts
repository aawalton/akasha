import type { CheckConfig } from "./check-configs-types"
import { ADDON_PACKAGE_SEEDS } from "./check-configs-addons-seeds"

export const ADDON_BUNDLE_SCAN_CHECKS: CheckConfig[] = [
  {
    name: "tstl-range-double-shift",
    dependsOn: ["addon-build"],
    dispatchNodes: [
      ...ADDON_PACKAGE_SEEDS,
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-tstl-range-double-shift.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/tstl-range-double-shift.ts",
    ],
    closurePolicy: "import-graph",
    script: "packages/temper/shared/build-deploy/checks/src/check-tstl-range-double-shift.ts",
  },
  {
    name: "tstl-anytable-length",
    dependsOn: ["addon-build"],
    dispatchNodes: [
      ...ADDON_PACKAGE_SEEDS,
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-tstl-anytable-length.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/tstl-anytable-length.ts",
    ],
    closurePolicy: "import-graph",
    script: "packages/temper/shared/build-deploy/checks/src/check-tstl-anytable-length.ts",
  },
  {
    name: "tstl-colon-dot-self-shift",
    dependsOn: ["addon-build"],
    dispatchNodes: [
      ...ADDON_PACKAGE_SEEDS,
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-tstl-colon-dot-self-shift.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/tstl-colon-dot-self-shift.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/tstl-colon-dot-self-shift.manifest.ts",
    ],
    closurePolicy: "import-graph",
    script: "packages/temper/shared/build-deploy/checks/src/check-tstl-colon-dot-self-shift.ts",
  },
]

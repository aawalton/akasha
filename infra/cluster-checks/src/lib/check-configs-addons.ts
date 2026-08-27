import { withAddonBuildCoDep } from "./addon-build-co-dep"
import type { CheckConfig } from "./check-configs-types"
import { ADDON_BUILD_CHECKS } from "./check-configs-addons-build"
import { ADDON_BUNDLE_SCAN_CHECKS } from "./check-configs-addons-bundle-scan"
import { ADDON_GLOBAL_CLOBBER_CHECKS } from "./check-configs-addons-global-clobber"
import { ADDON_HELD_TERRITORY_CHECKS } from "./check-configs-addons-held-territory"
import { ADDON_RUNTIME_GATE_CHECKS } from "./check-configs-addons-runtime-gates"
import { ADDON_TI_CLEAN_CHECKS } from "./check-configs-addons-ti-clean"
import { ADDON_XML_HANDLER_CHECKS } from "./check-configs-addons-xml-handlers"

export const ADDON_CHECKS: readonly CheckConfig[] = withAddonBuildCoDep([
  ...ADDON_BUILD_CHECKS,
  {
    name: "eso-global-decl-consistency",
    dispatchNodeTypes: [{ kind: "ts-file", under: "packages/temper" }],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-eso-global-decl-consistency.ts",
      "ts-file:code:infra/cluster-checks/src/lib/eso-global-decl-consistency.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-eso-global-decl-consistency.ts",
  },
  ...ADDON_GLOBAL_CLOBBER_CHECKS,
  ...ADDON_RUNTIME_GATE_CHECKS,
  {
    name: "tstl-this-void-self-drop",
    dispatchNodeTypes: [{ kind: "ts-file", under: "packages/temper" }],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-tstl-this-void-self-drop.ts",
      "ts-file:code:infra/cluster-checks/src/lib/ts-tstl-this-void-self-drop.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-tstl-this-void-self-drop.ts",
  },
  {
    name: "tstl-this-void-colon-method",
    dispatchNodeTypes: [{ kind: "ts-file", under: "packages/temper" }],
    dispatchNodes: [
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-tstl-this-void-colon-method.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/tstl-this-void-colon-method.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/tstl-this-void-colon-method.manifest.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/eso-colon-methods.generated.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/eso-base-game-globals.generated.ts",
    ],
    script: "packages/temper/shared/build-deploy/checks/src/check-tstl-this-void-colon-method.ts",
  },
  {
    name: "eso-typings-fresh",
    dispatchNodeTypes: [{ kind: "ts-file", under: "packages/temper" }],
    script: "packages/temper/shared/build-deploy/checks/src/check-eso-typings-fresh.ts",
  },
  {
    name: "addon-fingerprint-residue",
    dispatchNodeTypes: [{ kind: "ts-file", under: "packages/temper" }],
    dispatchNodes: [
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-addon-fingerprint-residue.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-fingerprint-residue.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-fingerprint-residue.manifest.ts",
    ],
    script: "packages/temper/shared/build-deploy/checks/src/check-addon-fingerprint-residue.ts",
  },
  {
    name: "lib-sets-stale-capture",
    dispatchNodeTypes: [{ kind: "ts-file", under: "packages/temper" }],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-lib-sets-stale-capture.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-lib-sets-stale-capture.ts",
  },
  ...ADDON_BUNDLE_SCAN_CHECKS,
  ...ADDON_HELD_TERRITORY_CHECKS,
  ...ADDON_TI_CLEAN_CHECKS,
  ...ADDON_XML_HANDLER_CHECKS,
])

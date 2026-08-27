import type { CheckConfig } from "./check-configs-types"

export const ADDON_XML_HANDLER_CHECKS: CheckConfig[] = [
  {
    name: "addon-orphan-xml-handler",
    dispatchNodeTypes: [{ kind: "ts-file", under: "packages/temper" }],
    dispatchNodes: [
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-addon-orphan-xml-handler.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-orphan-xml-handler.ts",
    ],
    script: "packages/temper/shared/build-deploy/checks/src/check-addon-orphan-xml-handler.ts",
  },
  {
    name: "addon-inline-handler-dispatch",
    dispatchNodeTypes: [{ kind: "ts-file", under: "packages/temper" }],
    dispatchNodes: [
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-addon-inline-handler-dispatch.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-inline-handler-dispatch.ts",
    ],
    script: "packages/temper/shared/build-deploy/checks/src/check-addon-inline-handler-dispatch.ts",
  },
]

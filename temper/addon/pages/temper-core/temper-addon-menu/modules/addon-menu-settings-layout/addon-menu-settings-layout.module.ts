import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuSettingsLayout = {
  id: "01a0c7a8-8981-779c-b510-3ae18d081e34",
  type: "page-type/module",
  slug: "addon-menu-settings-layout",
  definition: "the controls the Addons window is laid out from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The window is laid out in one call rather than control by control elsewhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The list and the buttons the window holds are built by the modules owning them.",
    },
  ],
} as const satisfies Module

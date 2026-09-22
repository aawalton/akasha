import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsSearchUiSearchuiGlobals = {
  id: "01a0623e-53a0-7264-80a2-22545178e71e",
  type: "page-type/module",
  slug: "lib-sets-search-ui-searchui-globals",
  definition: "where the live keyboard and gamepad search windows are kept",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A window is reached through a global string key rather than an import.",
    },
  ],
} as const satisfies Module

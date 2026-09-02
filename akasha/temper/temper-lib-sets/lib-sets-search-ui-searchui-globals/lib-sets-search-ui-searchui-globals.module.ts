import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiSearchuiGlobals = {
  id: "01a0623e-53a0-7264-80a2-22545178e71e",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-searchui-globals",
  definition: "where the live keyboard and gamepad search windows are kept",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A window is reached through a global string key rather than an import.",
    },
  ],
} as const satisfies Module

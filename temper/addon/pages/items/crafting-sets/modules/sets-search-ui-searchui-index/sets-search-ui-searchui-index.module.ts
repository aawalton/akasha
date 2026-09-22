import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiSearchuiIndex = {
  id: "01a0623e-53a2-77a4-8fe3-d86ebd012700",
  type: "page-type/module",
  slug: "sets-search-ui-searchui-index",
  definition: "the ordered side-effect imports of the search window's modules",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The order these modules are loaded in is the order their effects happen.",
    },
  ],
} as const satisfies Module

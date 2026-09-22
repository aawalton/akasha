import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiSharedRowmenu = {
  id: "01a0623e-539f-7075-a2eb-753df899c48d",
  type: "page-type/module",
  slug: "sets-search-ui-shared-rowmenu",
  definition: "the menu a result row opens under the right mouse button",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The menu does not open unless TemperScrollableMenu is present.",
    },
  ],
} as const satisfies Module

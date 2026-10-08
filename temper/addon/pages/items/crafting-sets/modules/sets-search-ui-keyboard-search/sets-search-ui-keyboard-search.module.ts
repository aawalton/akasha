import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiKeyboardSearch = {
  id: "01a0623e-53a2-77b1-bac5-30921369d712",
  type: "page-type/module",
  slug: "sets-search-ui-keyboard-search",
  definition: "the search terms taken from the keyboard window's dropdowns and text boxes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Item ids matter only when a gear filter is set.",
    },
  ],
  createdAt: "2026-09-02T13:10:46.946Z",
  updatedAt: "2026-09-22T14:23:15.000Z",
} as const satisfies Module

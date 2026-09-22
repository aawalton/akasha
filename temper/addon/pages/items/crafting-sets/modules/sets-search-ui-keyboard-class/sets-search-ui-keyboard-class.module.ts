import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiKeyboardClass = {
  id: "01a0623e-53a0-7c7c-9ac1-5e5f85c57505",
  type: "page-type/module",
  slug: "sets-search-ui-keyboard-class",
  definition: "the class the keyboard search window's objects are made from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A further view of this class is typed for overriding.",
    },
  ],
} as const satisfies Module

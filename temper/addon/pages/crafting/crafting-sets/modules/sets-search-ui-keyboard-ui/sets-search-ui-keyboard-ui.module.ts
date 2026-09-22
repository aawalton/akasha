import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiKeyboardUi = {
  id: "01a0623e-53a1-77ae-ba00-994d8a505f03",
  type: "page-type/module",
  slug: "sets-search-ui-keyboard-ui",
  definition: "what the keyboard search window does when it opens, resets or is moved",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The window's place and size are kept in the saved variables under searchUI.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A saved size is never below the window's minimum width and height.",
    },
  ],
} as const satisfies Module

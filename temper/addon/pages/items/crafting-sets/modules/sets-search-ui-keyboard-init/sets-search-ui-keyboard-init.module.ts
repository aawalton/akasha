import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiKeyboardInit = {
  id: "01a0623e-53a1-77aa-a5bb-c695082dd24d",
  type: "page-type/module",
  slug: "sets-search-ui-keyboard-init",
  definition: "what builds a fresh keyboard search window object",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A keystroke in a search box starts a new search 500 milliseconds later.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The window adds itself to the game's keyboard systems under the search UI name.",
    },
  ],
  createdAt: "2026-09-02T13:10:46.945Z",
  updatedAt: "2026-09-22T13:58:42.000Z",
} as const satisfies Module

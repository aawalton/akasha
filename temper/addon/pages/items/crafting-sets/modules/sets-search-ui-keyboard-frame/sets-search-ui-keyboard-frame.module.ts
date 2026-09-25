import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiKeyboardFrame = {
  id: "01a0d8d2-f20c-7716-92be-62820d058b8a",
  type: "page-type/module",
  slug: "sets-search-ui-keyboard-frame",
  definition: "the keyboard set search window set in the shared window frame",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The filters and results sit in the frame's body, the filters first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Search, reset and settings are the window's actions, in that order from the cross.",
    },
  ],
} as const satisfies Module

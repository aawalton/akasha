import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiKeyboardSearchHandlers = {
  id: "01a0623e-53a2-795c-a58f-b22803610c4d",
  type: "page-type/module",
  slug: "sets-search-ui-keyboard-search-handlers",
  definition: "the keyboard top-level window's answers to being created, moved and resized",
  code: "ts",
  decisions: [
    { decisionKind: "decision-kind/constraint", statement: "Each published name is fixed." },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The window object is made once on the first initialize event.",
    },
  ],
  createdAt: "2026-09-02T13:10:46.946Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderUiStrings = {
  id: "01a06381-67c1-7cd2-a410-e5dbfae940cd",
  type: "page-type/module",
  slug: "keybinder-ui-strings",
  definition: "the words the add-on shows in the key-bind window",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the table does not have reads as the empty string.",
    },
  ],
  createdAt: "2026-09-02T19:03:40.225Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module

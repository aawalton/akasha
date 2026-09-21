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
} as const satisfies Module

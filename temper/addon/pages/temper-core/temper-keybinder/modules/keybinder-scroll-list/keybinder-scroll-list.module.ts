import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderScrollList = {
  id: "01a06381-67c1-733c-93c4-841be62e7306",
  type: "page-type/module",
  slug: "keybinder-scroll-list",
  definition: "the account-wide checkbox added to every row of the key-bind list",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row built before the hook was installed is given its checkbox on setup.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The checkbox reads indeterminate where the saved keys differ from the bound keys.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clearing the checkbox drops the action from the account-wide set.",
    },
  ],
  createdAt: "2026-09-02T19:03:40.225Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module

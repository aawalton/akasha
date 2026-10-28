import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnOutcomeMarks = {
  id: "01a17f82-b35f-74e1-999e-b2d1e59a6977",
  type: "page-type/module",
  slug: "turn-outcome-marks",
  definition: "whether the changes a recorder at mechanics hands in state its outcomes' adds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each counted outcome line's `added` is owed, numbered by its line in the outcomes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An add to a purse or a story item is the inventory recorder's, any other the mechanics'.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An add is met by the changes marked with its line on its page and key, summed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every handing setting a key an add owed names is refused unless it is marked with that add's line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recorder's last handing of a turn is refused while an add of its own is unmet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At beats, the last handing is the one handing the turn's last beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At beats, the numbers seat answers for every add, a purse's and an item's too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn with no outcomes file owes no add.",
    },
  ],
  createdAt: "2026-10-27T22:37:14.463Z",
  updatedAt: "2026-10-28T00:09:13.800Z",
} as const satisfies Module

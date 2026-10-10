import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersInventoryHintItems = {
  id: "01a12634-ce22-7f9a-adaf-e052bbd9fff2",
  type: "page-type/module",
  slug: "characters-inventory-hint-items",
  definition: "the items an inventory hint lists when a click opens it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A click on a hint line with items opens its list, and a second click folds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The items listed are the items the plan counted for that line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A list longer than fifteen items ends with a line saying how many more there are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An opened line stays open across redraws until the line itself goes away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item's note names the character or craft bag it goes to, if any.",
    },
  ],
  createdAt: "2026-10-10T14:25:57.281Z",
  updatedAt: "2026-10-10T14:25:57.281Z",
} as const satisfies Module

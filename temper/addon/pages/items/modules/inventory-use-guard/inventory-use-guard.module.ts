import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryUseGuard = {
  id: "01a0e37b-d8b2-77ef-ad9e-8324ce35bc8d",
  type: "page-type/module",
  slug: "inventory-use-guard",
  definition: "which items the add-on may open or use without being asked",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a container is opened, whatever a rule says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A container holding a map, a writ or a survey is never opened, known by its item id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rule keeping those containers unopened lists the item ids this guard lists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "No treasure map, survey report, master writ or holiday writ is used, whatever a rule says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The item types are the game's own values, written out so a test can reach them.",
    },
  ],
} as const satisfies Module

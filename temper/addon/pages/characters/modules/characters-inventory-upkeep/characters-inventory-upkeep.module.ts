import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersInventoryUpkeep = {
  id: "01a0dee5-fc86-7cee-bb08-6e8be41ee7e7",
  type: "page-type/module",
  slug: "characters-inventory-upkeep",
  definition: "whether a character banked today and holds only what belongs with her",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bank visit counts only at the player's own bank, never at a house chest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is misplaced is what the items add-on's inventory plan counts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The hint is the inventory plan's own lines, with a bank line where no bank line is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character kept today stays kept today, whatever she picks up after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kept character's hint names the next character not kept today.",
    },
  ],
} as const satisfies Module

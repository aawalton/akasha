import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersInventoryUpkeep = {
  id: "01a0dee5-fc86-7cee-bb08-6e8be41ee7e7",
  type: "page-type/module",
  slug: "characters-inventory-upkeep",
  definition: "whether a character holds only what belongs with her today",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No daily bank visit is asked of a character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is misplaced is what the items add-on's inventory plan counts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hint is the inventory plan's own lines and nothing more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character is kept once today's check finds nothing misplaced.",
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
  createdAt: "2026-09-26T18:06:49.478Z",
  updatedAt: "2026-10-10T14:38:56.873Z",
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryQuestRelevance = {
  id: "01a06258-b52e-7f91-83d1-0448bcfb2b62",
  type: "page-type/module",
  slug: "inventory-quest-relevance",
  definition: "whether an item link is one a quest still needs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item is needed for a daily writ where it fulfils a condition of a daily crafting quest held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A daily writ held in the journal is still owed, whatever its conditions count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item read from a link alone is asked about as an item the player crafted.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.854Z",
  updatedAt: "2026-10-28T18:42:46.817Z",
} as const satisfies Module

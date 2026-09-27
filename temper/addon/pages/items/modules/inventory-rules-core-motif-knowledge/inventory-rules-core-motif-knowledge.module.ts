import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesCoreMotifKnowledge = {
  id: "01a06258-b52f-7219-a9f9-f6d5b67fe4a5",
  type: "page-type/module",
  slug: "inventory-rules-core-motif-knowledge",
  definition: "how many chapters of a motif a character knows, from the characters add-on's data",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's motif knowledge is read off her captured lore library, by book.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The captured motif knowledge keyed by item style id is not read here.",
    },
  ],
} as const satisfies Module

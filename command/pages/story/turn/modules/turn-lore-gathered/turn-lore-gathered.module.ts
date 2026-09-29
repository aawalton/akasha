import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnLoreGathered = {
  id: "01a0eae2-98f7-7a1b-b24e-978d3edace1e",
  type: "page-type/module",
  slug: "turn-lore-gathered",
  definition: "the lore in play a turn's own list holds, gathered from the world",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn opens at the commit that first added the turn's page, whatever moved it since.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn's world is the folder above the stories folder the turn's page sits under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn is named the lore pages and places its world gained or changed since it was made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page that is no longer there is named by no change to it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lore page of a world the turn is not of is never named.",
    },
  ],
} as const satisfies Module

import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIvTrade = {
  id: "01a0ed2a-678f-745d-a3cf-28a68049de9d",
  type: "page-type/world-check",
  slug: "overwhere-iv-trade",
  title: "Trade",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  definition: "the price a haggle in Overwhere IV settles on, or whether any deal is made",
  description: "What a bargain comes to.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only a haggle that matters is rolled; a fixed price or a small sum is simply paid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A haggle is an act on a twenty-sided die with the action check's bands and bonuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fair asking price is standard; a greedy or wary trader hard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Standing of five with the trader adds one, of ten adds two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Buying, strong pays four fifths, success nine tenths, cost the asking price.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Selling, strong gets a fifth more, success a tenth more, cost the asking price.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failed haggle makes no deal that day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Prices are in copper; ten copper make a silver and ten silver a gold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Coin changes hands only as this check answers, or as a wage, gift or theft.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Coin left with the adventurers' hall is held there, not in her purse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The purse page is written with what changed hands before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"band":"standard","bonuses":[],"listPrice":30,"selling":false}`.',
    },
  ],
} as const satisfies WorldCheck

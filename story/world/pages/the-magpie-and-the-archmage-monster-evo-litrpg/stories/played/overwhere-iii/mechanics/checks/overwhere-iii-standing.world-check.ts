import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIiiStanding = {
  id: "01a0ed2c-910d-74d5-946a-fbe360664057",
  type: "page-type/world-check",
  slug: "overwhere-iii-standing",
  title: "Standing",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  definition: "the standing one turn with a character in Overwhere III earns or costs",
  description: "How much a turn moved someone toward her or away.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is scored on what she did in that turn alone, for each character present.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn is marked on keeping faith, hearing them out, sharing openly, and shielding them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each mark scores from nought to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each line of the character's she crossed costs two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every score above nought quotes the words it rests on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change is the marks added, less what the crossed lines cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change is added to the relationship page between Nala and that character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Awe at her power earns nothing here; only how she treats them does.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
  ],
} as const satisfies WorldCheck

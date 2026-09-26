import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const theDatingGameClosenessScoring = {
  id: "01a0dee4-f4b7-70af-bd38-a35274387d8c",
  type: "page-type/world-check",
  slug: "the-dating-game-closeness-scoring",
  title: "Closeness Scoring",
  definition: "the relationship points one interaction with a character earns",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An interaction is scored on validation, acknowledgment, reassurance and emotional intimacy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each skill scores from nought to three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill scores nought where it never happened or its moment passed by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill scores one where it happened once and reached her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill scores two where it was held across several turns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill scores three where it kept meeting her feeling as that feeling shifted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each bid of hers he missed or brushed past costs two points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change in points is the four scores added, less what the missed bids cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Charm that meets none of the four skills earns nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A judge who saw only that interaction gives the scores.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A judge quotes the words each score rests on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Scoring is a check that rolls nothing, so a scored interaction is kept on its turn.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
  ],
} as const satisfies WorldCheck

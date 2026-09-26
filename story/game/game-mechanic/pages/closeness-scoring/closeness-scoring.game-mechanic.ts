import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const closenessScoring = {
  id: "01a0de4a-6030-79bc-9c3b-169a5104666c",
  type: "page-type/game-mechanic",
  slug: "closeness-scoring",
  definition: "the relationship points one interaction with a character earns",
  code: "ts",
  test: "ts",
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
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
  ],
} as const satisfies GameMechanic

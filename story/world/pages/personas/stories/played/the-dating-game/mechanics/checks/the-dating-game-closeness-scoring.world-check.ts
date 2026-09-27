import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const theDatingGameClosenessScoring = {
  id: "01a0dee4-f4b7-70af-bd38-a35274387d8c",
  type: "page-type/world-check",
  slug: "the-dating-game-closeness-scoring",
  title: "Closeness Scoring",
  definition: "the relationship points one turn with a character earns",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn is scored on validation, acknowledgment, reassurance and emotional intimacy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is scored on what he did in that turn alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each skill scores from nought to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill scores nought where it never happened in the turn or its moment passed by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill scores one where it happened and reached her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill scores two where it kept meeting her feeling as that feeling shifted within the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each bid of hers he missed or brushed past costs two points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bid counts where the turn shows it or the turn before ended on it.",
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
      statement: "A judge who saw only that turn gives the scores.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A judge quotes word for word the words each score above nought and each missed bid rests on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading names the character whose points it scores.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Scoring is a check that rolls nothing, so a scored turn keeps its reading and answer in its rolls.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn scores each character once.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
  ],
} as const satisfies WorldCheck

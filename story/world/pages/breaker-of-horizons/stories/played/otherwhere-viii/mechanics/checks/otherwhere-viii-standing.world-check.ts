import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViiiStanding = {
  id: "01a0ea3b-ec94-759a-8127-689daa86ed5d",
  type: "page-type/world-check",
  slug: "otherwhere-viii-standing",
  title: "Standing",
  world: "world/breaker-of-horizons",
  definition: "the standing one turn with a person in Otherwhere VIII earns or costs",
  description: "How much a turn moved someone's regard for Nala.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is scored on what she did in it alone, for each one present who matters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn is marked on keeping faith, hearing them out, helping, and respecting their ways.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Respecting their ways is keeping their manners, their forms and their customs in earnest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each mark scores from nought to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each line of theirs she crossed, such as lying to their face, costs three.",
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
      statement: "Standing is the points of a relationship page naming her and them, from nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relationship page is filed when she first deals with someone in earnest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Below nought they are cold, and may turn her away or report her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From nought to nine they are wary of a stranger, correct and no more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From ten to twenty-four they are friendly and help unasked in small things.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From twenty-five to forty-nine they trust her, teach her and take risks for her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From fifty they are hers, and face any danger beside her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Standing sets how they treat her, never whether her acts come off.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No standing shows as a number, in the prose or on the play screen.",
    },
  ],
} as const satisfies WorldCheck

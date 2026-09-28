import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViiStanding = {
  id: "01a0ea34-528c-7b89-8ecb-f9309d3f483d",
  type: "page-type/world-check",
  slug: "otherwhere-vii-standing",
  title: "Standing",
  world: "world/god-of-trash",
  definition: "the standing one turn with a person or beast in Otherwhere VII earns or costs",
  description: "How much a turn moved someone's regard for Nala.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn is scored on what she did in that turn alone, for each person or beast present who matters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn is marked on keeping faith, hearing them out, sharing openly and giving freely.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each mark scores from nought to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A beast is marked on the same four, read from what it plainly wants: food, respect and room.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each line of theirs she crossed, or face she cost them before others, costs three.",
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
      statement:
        "Regard is kept as the points of a relationship page naming her and them, starting at nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading's character is the slug of that relationship page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relationship page is filed when she first deals with someone in earnest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Below nought they are cold and withhold what they may.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From nought to nine they are wary strangers, correct and no more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From ten to twenty-four they are friendly and help unasked in small things.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "From twenty-five to forty-nine they trust her, share what they know and take risks for her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From fifty they are family, and take her side at any cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mage's regard for a mortal starts at minus five, and only deeds move it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Regard sets how they treat her, never whether her acts come off.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No regard shows as a number.",
    },
  ],
} as const satisfies WorldCheck

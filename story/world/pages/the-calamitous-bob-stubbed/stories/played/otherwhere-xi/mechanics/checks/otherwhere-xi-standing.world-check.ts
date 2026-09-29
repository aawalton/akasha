import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXiStanding = {
  id: "01a0ea6d-a7cc-7178-831f-f6a73e3abf3b",
  type: "page-type/world-check",
  slug: "otherwhere-xi-standing",
  title: "Standing",
  world: "world/the-calamitous-bob-stubbed",
  definition: "the standing one turn with a person or beast in Otherwhere XI earns or costs",
  description: "How far someone's regard for another has shifted.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn is scored on what she did in it alone, for each person or beast present who matters.",
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
        "Work done unasked on a farm or in a household counts as giving, and counts twice.",
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
        "Regard is kept as the points of a relationship page naming her and them, from nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading's character is the slug of that relationship page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change answered is added to that page's points before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relationship page is filed when she first deals with someone in earnest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Hill folk start at minus two with a barefoot stranger in odd clothes who will not say whence.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A priest or anyone given to charity starts at nought.",
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
      statement: "From fifty they are kin in all but blood, and take her side at any cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Regard sets how they treat her, never whether her acts come off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Word of her spreads in a village within a day, and sets how strangers there start.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No regard shows as a number, and the play screen shows no bonds.",
    },
  ],
} as const satisfies WorldCheck

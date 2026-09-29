import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXStanding = {
  id: "01a0ea76-860a-7467-92a7-631ba1bbf328",
  type: "page-type/world-check",
  slug: "otherwhere-x-standing",
  title: "Standing",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  definition: "the regard one turn with a person in Otherwhere X earns or costs",
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
        "A turn is marked on keeping her word, respect, aid given, fair dealing and honesty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Honesty is owning what she can of herself rather than a tale made up to please.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Fair dealing is paying what was agreed and taking no more than was offered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each mark scores from nought to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each wrong she did them, such as a lie found out or a theft, costs three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every score above nought says why, and the reading states the points before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change is the marks added, less what the wrongs cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change is added to the points of the relationship page naming her and them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relationship page is filed when she first deals with someone in earnest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Below nought they are cold, and may turn her out, cheat her or report her.",
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
      statement:
        "From twenty-five to forty-nine they trust her, vouch for her, and teach her what they know.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From fifty they are hers, and would stand between her and a soldier's irons.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A family secret such as a cycling technique is shared only from fifty.",
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

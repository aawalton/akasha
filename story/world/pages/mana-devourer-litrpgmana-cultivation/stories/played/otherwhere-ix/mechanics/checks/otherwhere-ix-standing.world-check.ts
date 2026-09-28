import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIxStanding = {
  id: "01a0ea3c-de85-749b-a999-e6149225be47",
  type: "page-type/world-check",
  slug: "otherwhere-ix-standing",
  title: "Standing",
  world: "world/mana-devourer-litrpgmana-cultivation",
  definition: "the regard one turn with a person or beast in Otherwhere IX earns or costs",
  description: "How much a turn moved someone's regard for Nala.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is scored on what she did in it alone, for each one present who matters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is marked on keeping her word, respect, aid given, and fair dealing.",
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
      statement: "Every score above nought gives the grounds it rests on.",
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
      statement: "Below nought they are cold, and may cheat her, drive her off or sell her out.",
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
      statement: "From fifty they are hers, and would face a catcher or a god's servant for her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beast's regard is scored the same way, on calm, feeding and no harm done.",
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

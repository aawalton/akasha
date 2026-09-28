import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIiHarm = {
  id: "01a0e996-0a34-7c37-ac8e-10400ca3107b",
  type: "page-type/world-check",
  slug: "otherwhere-ii-harm",
  title: "Harm",
  world: "world/labyrinth-of-the-mad-god",
  definition: "how much harm a blow that landed in Otherwhere deals",
  description: "How badly a blow, bite or fall hurts.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow is settled only once an action check has landed it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm is one six-sided die plus the blow's force, less its ward and toughness.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A light blow adds nothing, solid two, heavy four, savage seven, crushing ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Bare hands and thrown stones are light; a club, spear or small beast's bite solid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mire monitor's bite is heavy; the ashback's claw or jaws savage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fall of twenty feet is heavy, and of forty crushing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A blow landed strongly adds three, and one landed at a cost deals half, rounded up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ward runs from nought for bare skin to eight for plate or stone hide.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Toughness past six shrugs off one harm for every three points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands deals at least one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A foe attacks through the action check, against the band for dodging or blocking it.",
    },
  ],
} as const satisfies WorldCheck

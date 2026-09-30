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
    {
      decisionKind: "decision-kind/departure",
      statement: "A person's most health is ten and twice their Toughness.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beast's most health is set when it is filed, by its size and level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beast's size gives three health if tiny, eight if small, sixteen if man-sized.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A large beast's size gives thirty health, and a huge one's sixty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beast has three more health for each of its levels.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At nought health a character is down: senseless, and at the mercy of what is near.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character down with a foe near and no help dies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Health comes back one an hour at rest with water, and a quarter with a night's sleep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wound left dirty festers, and a festering wound heals nothing until cleaned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in health is written on the page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Health shows in the prose as the body feels it, never as a number.",
    },
  ],
} as const satisfies WorldCheck

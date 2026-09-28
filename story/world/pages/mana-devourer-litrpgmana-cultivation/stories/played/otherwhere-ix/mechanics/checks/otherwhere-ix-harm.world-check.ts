import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIxHarm = {
  id: "01a0ea36-2cb1-7781-8ac1-17ee37959927",
  type: "page-type/world-check",
  slug: "otherwhere-ix-harm",
  title: "Harm",
  world: "world/mana-devourer-litrpgmana-cultivation",
  definition: "how much harm a blow that landed in Otherwhere IX deals, and the wound it leaves",
  description: "How badly a blow, bite, burn or fall hurts.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow is settled only once an action check has landed it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Harm is one six-sided die plus the blow's force, less the ward, times the striker's grade.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A light blow adds nothing, solid two, heavy four, savage seven, crushing ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The grade multiplies by three at G, six at F, twelve at E, and twenty-five at D.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The grade multiplies by fifty at C, a hundred at B, and two hundred at A.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A striker's grade is a beast's own, or a person's by level; a better weapon's rules.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Fists, thrown stones and small bites are light; a club, knife or shardback bite solid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A great beast's jaws, a glaive's full swing or a fall of twenty feet is heavy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A blow landed strongly adds three, and one landed at a cost deals half, rounded up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ward runs from nought for bare skin to eight for plate or a stone skin.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands deals at least one before the grade multiplies it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm is taken from the health a character has left, as its health page holds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Above three quarters left is whole, then scraped, hurt to a quarter, grievous, down at nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Hurt costs one on every act, and grievous costs three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Down with danger present is a real loss, never softened to save the scene.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep restores a tenth of most health, and tended wounds a fifth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A potion, a spell or Life Mana restores what its own page says, at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow to a foe is settled against that foe's own health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading names force, grade, landed, ward, health and maxHealth.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No number of harm or health appears in the prose but in a system box.",
    },
  ],
} as const satisfies WorldCheck

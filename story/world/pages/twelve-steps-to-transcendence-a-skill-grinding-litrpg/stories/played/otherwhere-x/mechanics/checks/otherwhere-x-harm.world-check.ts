import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXHarm = {
  id: "01a0ea6b-0364-713a-b00b-afec17cbde90",
  type: "page-type/world-check",
  slug: "otherwhere-x-harm",
  title: "Harm",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  definition: "how much harm a blow that landed in Otherwhere X deals, and the wound it leaves",
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
        "Harm is one six-sided die plus the blow's force, less the ward, times the striker's tier scale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A light blow adds nothing, solid two, heavy four, savage seven, crushing ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The tier scale is one at Tier 0, three at 1, eight at 2, twenty at 3, fifty at 4.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fall, a fire or a flood strikes at the tier the world builder sets for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Fists, thrown stones and small bites are light; a club, knife, pitchfork or wolf's bite solid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A troll's club, a sword's full swing or a fall of twenty feet is heavy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A blow landed strongly adds three, and one landed at a cost deals half, rounded up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A ward runs from nought for bare skin to eight for plate or a skill hardening the skin.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands deals at least one before the tier scales it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm is taken from the health a character has left, as its health page holds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Most health is twenty at Tier 0, sixty at Tier 1, and 160 at Tier 2.",
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
      statement: "A Tier 1 body heals twice as fast as a Tier 0 body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A healing skill or a potion restores what its own page says, at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow to a foe is settled against that foe's own health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading names force, tier, landed, ward, health and maxHealth.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No number of harm or health appears in the prose.",
    },
  ],
} as const satisfies WorldCheck

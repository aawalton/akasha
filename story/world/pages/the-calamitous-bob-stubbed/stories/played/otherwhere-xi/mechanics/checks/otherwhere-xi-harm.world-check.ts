import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXiHarm = {
  id: "01a0ea7e-7705-74d6-ad13-2647ebe55a6e",
  type: "page-type/world-check",
  slug: "otherwhere-xi-harm",
  title: "Harm",
  world: "world/the-calamitous-bob-stubbed",
  definition: "how much harm a blow that landed in Otherwhere XI deals, and the wound it leaves",
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
        "Harm is one six-sided die plus the blow's force, less the ward, times the striker's step scale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A light blow adds nothing, solid two, heavy four, savage seven, crushing ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The scale is one at step nought or one, two at step two, three at three, six at four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scale is twelve at step five and twenty-five at step six.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beast's step is read off its danger as the action check reads it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Fists, thrown stones and small bites are light; a club, knife or dog's bite solid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A sword, a spear's thrust, a scalehound's jaws or a fall of twenty feet is heavy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A war-axe's full swing or an elemental's scouring blast is savage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spell's force is what the mana-flow check answers for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A blow landed strongly adds three, and one landed at a cost deals half, rounded up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A ward is nought for bare skin, two for leather or a gambeson, four for mail, eight for plate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands deals at least one before the scale multiplies it.",
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
      statement: "A blow to a foe is settled against that foe's own health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading names force, step, landed, ward, health and maxHealth.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No number of harm or health appears in the prose.",
    },
  ],
} as const satisfies WorldCheck

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
    {
      decisionKind: "decision-kind/departure",
      statement: "A person's most health is twenty, two for each Endurance, and ten for each step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A beast's most health follows its danger: 10 to 30 not dangerous, to 60 not very, to 150 dangerous.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lethal beast has 150 health or more; a dragon a thousand or more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe is filed as a character with a health page of its own before it is hurt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At nought she falls senseless and dying, and dies within the hour untended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm dealt past nought of a fifth of her most health or more kills her outright.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A third of her most health or more lost to one blow leaves a lasting injury.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A lasting injury is a wrench, deep gash, bad bite, burn or break in the part the blow struck.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every act leaning on the injured part is one band harder until it heals.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wrench or gash heals in a week of light use; a break in six weeks, splinted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A healer's care halves an injury's healing; hard use before it heals doubles it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A lasting injury is written as a fact on the injured one's lore page when it happens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour of true rest gives back one health; hunger or cold stops it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep fed and sheltered gives back a quarter of her most health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clean dressing, herbs or a wise woman's care double what rest gives back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wise woman's life-mana healing gives back ten at once, once a day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mending potion gives back twenty at once and closes a gash or bite.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in health is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The interface never shows her health; she knows it only as her body feels it.",
    },
  ],
} as const satisfies WorldCheck

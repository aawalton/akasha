import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereVHarm = {
  id: "01a0e9f8-8d10-74ff-b5af-2c84291aab9c",
  type: "page-type/world-check",
  slug: "otherwhere-v-harm",
  title: "Harm",
  world: "world/ends-of-magic",
  definition: "how much harm a blow that landed in Otherwhere V deals, and the wound it leaves",
  description: "How badly a blow, bite, burn or fall hurts.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow is settled only once an action check has landed it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm is one six-sided die plus the blow's force, less the ward it meets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A light blow adds nothing, solid two, heavy four, savage seven, crushing ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Fists, thrown stones and small claws are light; a club, knife or cat's claws solid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gloamcat's throat bite, a hillboar's tusk and a fall of twenty feet are heavy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dragonwolf's jaws or fire are savage, and a fall of forty feet crushing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A blow landed strongly adds three, and one landed at a cost deals half, rounded up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ward runs from nought for bare skin to eight for plate or a mage's barrier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands deals at least one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala has twenty health, and harm is taken from what she has left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Above fifteen left she is whole, then scraped, hurt to ten, grievous to one, down at nought.",
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
      statement: "A night's rest restores two health, and tended wounds four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Healing magic restores what the spell's tier says, at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow to a foe is settled against that foe's own health.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No number of harm or health appears in the prose.",
    },
  ],
} as const satisfies WorldCheck

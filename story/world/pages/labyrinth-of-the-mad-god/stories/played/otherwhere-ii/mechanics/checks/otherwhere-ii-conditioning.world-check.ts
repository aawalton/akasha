import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIiConditioning = {
  id: "01a0e9a6-56d0-74e7-ace2-8c4d2cec3a93",
  type: "page-type/world-check",
  slug: "otherwhere-ii-conditioning",
  title: "Conditioning",
  world: "world/labyrinth-of-the-mad-god",
  definition: "whether an ordeal in Otherwhere raises a character's baseline in one attribute",
  description: "The body and mind growing stronger by being pushed to their limits.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Conditioning is settled once a turn per character, for one attribute, with no dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Strength, Dexterity and Toughness rise from deadly battle or long, hard training.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Magic rises from mana practice, Mind and Creativity from study, Charisma from real stakes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fitting ordeal raises the baseline one, and the total with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade E baseline stops at ten, and reaching ten gives a bonus point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute is conditioned at most once a day, and only by a real ordeal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rise shows as a System window once the ordeal is over.",
    },
  ],
} as const satisfies WorldCheck

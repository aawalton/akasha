import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViiHarm = {
  id: "01a0ea31-d3e4-7e4d-a70a-5ddf1cf1790c",
  type: "page-type/world-check",
  slug: "otherwhere-vii-harm",
  title: "Harm",
  world: "world/god-of-trash",
  definition: "how much harm a blow that landed in Otherwhere VII deals",
  description: "How badly a blow that lands hurts.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow is settled only once an act has landed it, rolling one six-sided die.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm is the die plus the blow's force, less the ward it meets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A light blow adds nothing, a solid one two, a heavy one four, a crushing one eight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Bare hands, a thrown stone and a rat's bite strike light.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A club, a boot, a dog's bite and a hard fall strike solid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blade, a spear, a wolf's bite and a boar's tusk strike heavy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mage's blow, a spell, a mana beast's and a long fall strike crushing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow landed strongly adds three, and one landed at a cost deals half.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ward runs from nought for bare skin to six for beast hide or a mage's body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Padded cloth wards one, leather two, and monster-hide armour four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands deals at least one.",
    },
  ],
} as const satisfies WorldCheck

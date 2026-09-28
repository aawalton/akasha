import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViHarm = {
  id: "01a0ea40-5673-7ad9-a1b6-0b2ea6041981",
  type: "page-type/world-check",
  slug: "otherwhere-vi-harm",
  title: "Harm",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  definition: "how much harm a blow that landed in Otherwhere VI deals",
  description: "How badly a blow that lands hurts.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow is settled only once an act has landed it, rolling two six-sided dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm is the dice plus the blow's force and might, less the ward it meets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A light blow adds nothing, a solid one three, a heavy one seven, a crushing one fourteen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Bare hands, a thrown stone, a rat's bite and a fall from head height strike light.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A club, a boot, a wolf's or dog's bite, a boar's tusk and a horned rabbit strike solid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blade, a spear, an arrow, a bear's claw and a long fall strike heavy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A named monster's blow, a Tier 1 beast's full blow and a spell strike crushing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Might is one for each five of the striker's Strength.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow landed strongly adds four, and one landed at a cost deals half.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ward runs from nought for bare skin to ten for stone hide or plate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Her shirt and tights ward nought; leather wards two, mail four, beast plates six.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wolf's fur wards one, a boar's hide two, and an Earthen Bear's stone hide six.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands deals at least one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The harm dealt is written off the struck one's HP page before the turn moves on.",
    },
  ],
} as const satisfies WorldCheck

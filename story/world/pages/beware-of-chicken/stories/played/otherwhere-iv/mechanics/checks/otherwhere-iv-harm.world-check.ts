import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIvHarm = {
  id: "01a0e9f7-c596-7b73-a99b-74525b635bef",
  type: "page-type/world-check",
  slug: "otherwhere-iv-harm",
  title: "Harm",
  world: "world/beware-of-chicken",
  definition: "how much harm a blow that landed in Otherwhere IV deals",
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
      statement: "Bare hands, a thrown stone and a goose's beak strike light.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A club, a hoe, a dog's bite and a hard fall strike solid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blade, a spear, a wolf's bite and a boar's tusk strike heavy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cultivator's blow, a spirit beast's and a long fall strike crushing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow landed strongly adds three, and one landed at a cost deals half.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ward runs from nought for bare skin to six for thick hide or Qi-hard flesh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Padded cloth wards one, and leather two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands deals at least one.",
    },
  ],
} as const satisfies WorldCheck

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
    {
      decisionKind: "decision-kind/departure",
      statement: "A mortal woman has twenty health, and a grown mortal man twenty-four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe is filed as a character with a health page of its own before it is hurt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Below half her health she hurts, and every act costs her one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At nought she is down and senseless, at the mercy of whatever remains.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm dealt past nought, a fifth of her health or more, kills her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Half her health or more lost to one blow leaves a lasting injury as a condition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep with food and shelter gives back a quarter of her health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night in the open, cold or hungry, gives back nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clean dressing, herbs or a healer's care double what a night gives back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lasting injury heals only with time and care, as its condition says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in health is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No health shows as a number; hurt shows as the body shows it.",
    },
  ],
} as const satisfies WorldCheck

import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const thornfordActionCheck = {
  id: "01a14b66-e8d0-7690-bb84-d65ab1e86074",
  type: "page-type/world-check",
  slug: "thornford-action-check",
  title: "Action Check",
  world: "world/thornford",
  definition: "whether a declared act in Thornford comes off, and how well",
  description: "Whether something tried comes off.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an act whose outcome is in doubt and matters is rolled; the rest is told.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act is one twenty-sided die plus every bonus the act earns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An easy act's target is 8, a standard act's 12, a hard act's 16, an extreme act's 20.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The band is set against Nala as she is, before the roll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Cutting, sewing and fitting cloth are Nala's trade, and are easy or standard for her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What an untrained grown woman could do with care is easy or standard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Seeing through a fae's words or a fae's glamour is hard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus names what it comes from and runs from minus four to four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clever plan, a fitting tool or help from someone adds one to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pain, cold, hunger, tiredness, haste or ignorance each take one to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act's bonuses add to at most six either way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act clearing its target by five or more comes off strongly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act meeting its target comes off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act short of its target by four or less comes off at a cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act short of its target by five or more fails, and the scene worsens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A natural twenty comes off strongly and a natural one fails, whatever the margin.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cost is real: hurt, lost time, spoiled cloth, a word given carelessly, or something lost.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Dice, bands and margins never appear in the prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"band":"standard","bonuses":[{"from":"a fitting tool","by":1}]}`.',
    },
  ],
  createdAt: "2026-10-17T19:46:37.902Z",
  updatedAt: "2026-10-17T19:46:37.902Z",
} as const satisfies WorldCheck

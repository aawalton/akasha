import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIiiActionCheck = {
  id: "01a0ed2c-910d-7152-8d74-f4e214a2de08",
  type: "page-type/world-check",
  slug: "overwhere-iii-action-check",
  title: "Action Check",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  definition: "whether a declared act in Overwhere III comes off, and how well",
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
      statement: "The band is set against Nala as she is, trait and all, before the roll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A working against a beast, bandit or blighted thing of the Wrenmark is easy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A working against a foe of Level 20 to 35 is standard, and past 35 hard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A working against a Pillar or a foe past Level 80 is extreme.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus names what it comes from and runs from minus four to four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A working powered by Mana Weaver adds one per rank the trait has reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill she holds adds one at Adept, two at Expert and three at Legend.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clever plan, a fitting tool or help from someone adds one to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pain, hunger, cold, a drained well of mana or ignorance each take one to two.",
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
      statement: "A cost is real: a hurt, lost time, noise, a witness, or something broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failure sets her back or embarrasses her; it never kills her.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Dice, bands and margins never appear in the prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"band":"easy","bonuses":[{"from":"Mana Weaver","by":3}]}`, by her rank now.',
    },
  ],
} as const satisfies WorldCheck

import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViGrowth = {
  id: "01a0ea43-7073-7049-816d-623f05116bb3",
  type: "page-type/world-check",
  slug: "otherwhere-vi-growth",
  title: "Growth",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  definition: "how many levels a kill, a meal or a feat brings a character in Otherwhere VI",
  description: "How far a kill or a feat carries someone toward the next level.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Growth is settled with no dice whenever a kill, a strong meal or a feat lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading states her Tier, level, level cap and progress, and each gain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Power is a creature's level, plus 10 at Tier 1, 35 at Tier 2, 85 at 3 and 185 at 4.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kill gives the prey's power less hers plus five, from nought up to twelve.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A named monster's kill gives three times as much.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kill shared in a fight is split evenly among those who shared it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Eating a strong beast's meat gives a quarter of what its kill would, once a day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A feat the System marks, a first survival or a hard lesson, gives one to five.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The next level costs four plus the level she is at, times one more than her Tier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At the level cap growth stops and what is left over is lost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each level gained gives three stat points, one at a time, to what she did to earn it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person with no Class spreads her level's points over three different stats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each level raises her HP, SP and MP maximums as their pages' sums say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The System shows each level as 【Level Up: 1 → 2】, its stat lines, and often a dry remark.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her level and progress are written on their pages before the turn moves on.",
    },
  ],
} as const satisfies WorldCheck

import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const blueBoxesActionCheck = {
  id: "01a14af2-a8ba-770a-b8f7-4bc934665679",
  type: "page-type/world-check",
  slug: "blue-boxes-action-check",
  title: "Action Check",
  world: "world/blue-boxes",
  definition: "whether a declared act in Blue Boxes comes off, and how well",
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
      statement: "The band is set against Nala as she is, level, class and all, before the roll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What an untrained grown woman could do with care is easy or standard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fight with a beast or a foe near her own level is standard, and five over, hard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fight with a foe ten levels past her, or more, is extreme.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus names what it comes from and runs from minus four to four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill she holds adds one per three levels it has, at most three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clever plan, a fitting tool or help from someone adds one to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Pain, cold, hunger, bare feet on rough ground, haste or ignorance each take one to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act's bonuses add to at most six either way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Iris may add one or two to an act of Nala's, named in the reading as Iris's favor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Iris's favor is Iris's own choice, made in her character before the roll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Iris gives no favor to anyone but Nala, and none unasked unless Nala is in danger.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every favor is a rule bent, and the turn that gives one says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nemesis notices once Iris has given ten favors, and each one past that is seen.",
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
        "A cost is real: hurt, lost time, noise, a chill taken, or something lost or broken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Dice, bands and margins never appear in the prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A favor shows in the prose only as luck, or as a softer line in a window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"band":"standard","bonuses":[{"from":"Iris\'s favor","by":1}]}`.',
    },
  ],
  createdAt: "2026-10-17T17:39:39.320Z",
  updatedAt: "2026-10-17T17:39:39.320Z",
} as const satisfies WorldCheck

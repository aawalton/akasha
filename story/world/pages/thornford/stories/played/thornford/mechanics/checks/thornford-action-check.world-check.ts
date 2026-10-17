import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const thornfordActionCheck = {
  id: "01a14b66-e8d0-7690-bb84-d65ab1e86074",
  type: "page-type/world-check",
  slug: "thornford-action-check",
  title: "Action Check",
  world: "world/thornford",
  definition: "how a character in Thornford answers what Nala does, where that is in doubt",
  description: "How someone answers what Nala does.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What Nala sets out to do comes off, and is told without a roll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clever plan of Nala's comes off well, and is told without a roll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only how Shaestrel or another character answers Nala is rolled, where it is in doubt and matters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A response is one twenty-sided die plus every bonus the moment earns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An easy response's target is 8, a standard one's 12, a hard one's 16, an extreme one's 20.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A response Nala could expect is easy, and one she is hoping for is standard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A response that asks much of the character is hard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A response against what the character wants is extreme.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus names what it comes from and runs from minus four to four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Charm, a clever word, a fitting gift or a good moment adds one to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A careless word or a bad moment takes one to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A response's bonuses add to at most six either way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A response clearing its target by five or more, or on a natural twenty, is warm.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A warm response is what Nala hoped for, with more given than she asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A response meeting its target is as-hoped, and is what Nala hoped for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A response short of its target, or on a natural one, is a twist.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A twist is the character answering some other way: a tease, a dodge, or a different opening.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A twist takes away nothing Nala has done, made or holds.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Dice, bands and margins never appear in the prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"band":"standard","bonuses":[{"from":"a clever word","by":1}]}`.',
    },
  ],
  createdAt: "2026-10-17T19:46:37.902Z",
  updatedAt: "2026-10-17T21:33:59.891Z",
} as const satisfies WorldCheck

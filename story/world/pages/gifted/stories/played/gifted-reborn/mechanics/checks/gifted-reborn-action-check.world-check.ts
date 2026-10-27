import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const giftedRebornActionCheck = {
  id: "01a17f15-90c1-7322-9224-70cbc8178934",
  type: "page-type/world-check",
  slug: "gifted-reborn-action-check",
  title: "Action Check",
  world: "world/gifted",
  definition: "whether an act Nala tries in Gifted: Reborn comes off",
  description: "The test of whether something tried comes off, and how well.",
  settling: {},
  difficultyMoved: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An act is settled by the tiered roll, with `--dice 3d60`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Basic Path adds 5 for each Tier passed, and an Advanced Path 10, under its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act on a Basic Attribute alone adds half of what the Attribute is over 100.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An Elite Path, or a Path of no stated kind, is no craft an act names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Path held but not listed in this check's code is refused until it is listed.",
    },
  ],
  createdAt: "2026-10-27T20:38:02.175Z",
  updatedAt: "2026-10-27T20:38:02.175Z",
} as const satisfies WorldCheck

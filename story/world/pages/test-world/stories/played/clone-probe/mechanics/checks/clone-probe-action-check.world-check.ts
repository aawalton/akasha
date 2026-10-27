import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const cloneProbeActionCheck = {
  id: "01a17f3e-4458-7bef-a632-9445724d5264",
  type: "page-type/world-check",
  slug: "clone-probe-action-check",
  title: "Action Check",
  world: "world/test-world",
  definition: "whether an act the player character tries in the test story comes off",
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
      statement: "A held skill adds its experience, at most 50, under the skill's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat named in place of a skill adds three for each point over ten.",
    },
  ],
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies WorldCheck

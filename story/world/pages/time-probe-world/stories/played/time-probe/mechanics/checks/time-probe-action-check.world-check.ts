import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const timeProbeActionCheck = {
  id: "01a1802d-b13e-708f-8d85-17e4eda50750",
  type: "page-type/world-check",
  slug: "time-probe-action-check",
  title: "Action Check",
  world: "world/time-probe-world",
  definition: "whether an act the player character tries in the test story comes off",
  description: "The test of whether something tried comes off, and how well.",
  settledBy: "world-check/test-story-action-check",
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
    {
      decisionKind: "decision-kind/departure",
      statement: "The skills and stats read are the pages naming the reading's character.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The code imports no page of its story, so a clone of the story forwards to it.",
    },
  ],
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies WorldCheck

import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const skillLockProbeActionCheck = {
  id: "01a17ff8-9a7f-7950-9cca-307c28c09c2b",
  type: "page-type/world-check",
  slug: "skill-lock-probe-action-check",
  title: "Action Check",
  world: "world/skill-lock-probe-world",
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
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies WorldCheck

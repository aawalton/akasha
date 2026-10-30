import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const giftedPolishActionCheck = {
  id: "01a18e17-127d-75dc-89cf-a80874a22f79",
  type: "page-type/world-check",
  slug: "gifted-polish-action-check",
  title: "Action Check",
  world: "world/gifted-polish-world",
  definition: "whether an act Nala tries in Gifted: Reborn comes off",
  description: "The test of whether something tried comes off, and how well.",
  settledBy: "world-check/gifted-reborn-action-check",
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
      statement: "A Path's kind is read off the Tiers its world skill states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Ten Tiers from 10 to 10000 make a Basic Path, five from 10 to 1000 an Advanced one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The Paths an act names are the skills its character holds, read from their pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Path held but not yet opened, stating `unrevealed: true`, is refused until it opens.",
    },
  ],
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies WorldCheck

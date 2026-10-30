import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const giftedTrial2ActionCheck = {
  id: "01a18dab-06cd-79cc-98b1-cc6058cd3aa4",
  type: "page-type/world-check",
  slug: "gifted-trial2-action-check",
  title: "Action Check",
  world: "world/gifted-trial2-world",
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
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies WorldCheck

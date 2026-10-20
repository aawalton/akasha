import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildShowGapStats = {
  id: "01a15a05-8c5a-7a16-9357-17d69056dd72",
  type: "page-type/module",
  slug: "build-show-gap-stats",
  definition: "what closing each gap alone changes a character's stats by, set against the design",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Stats are worked out for both bars by `calculateBuildStatsByBar`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The target stat is the one the build page's description states, else the one its name maximizes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "With no target stat, a gap shows every sheet stat it changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Gaps are sorted by the largest change on either bar, largest first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The totals set the design's stat against the character's, with the difference.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Temper works stars out as if full, so a star's missing points change no stat.",
    },
  ],
  createdAt: "2026-10-20T15:54:35.482Z",
  updatedAt: "2026-10-20T15:54:35.482Z",
} as const satisfies Module

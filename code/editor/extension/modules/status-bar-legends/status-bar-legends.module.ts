import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const statusBarLegends = {
  id: "01a0655b-ae42-7398-bbea-589a74f1d120",
  type: "page-type/module",
  slug: "status-bar-legends",
  definition: "the labels a stoplight section's tooltip names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every stoplight section is here whether or not the section has been read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section that has not been read names no labels.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section whose read failed keeps the labels the section last named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The labels and the glyphs beside the labels come out of one reading of a group.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here fetches a label.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here schedules or times out a read.",
    },
  ],
  createdAt: "2026-09-03T03:41:42.338Z",
  updatedAt: "2026-09-15T18:33:01.000Z",
} as const satisfies Module

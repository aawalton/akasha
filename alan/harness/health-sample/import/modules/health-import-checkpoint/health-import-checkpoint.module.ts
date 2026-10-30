import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const healthImportCheckpoint = {
  id: "01a05c14-b11a-7003-bd04-1cf0d76f48ca",
  type: "page-type/module",
  slug: "health-import-checkpoint",
  definition: "the progress a run that imports health samples keeps on disk",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkpoint is keyed by the readings imported rather than by when.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkpoint that will not parse is taken as no checkpoint.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A finished import clears its checkpoint.",
    },
  ],
  createdAt: "2026-09-01T08:27:35.066Z",
  updatedAt: "2026-10-30T15:37:11.707Z",
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const healthImportCheckpoint = {
  id: "01a05c14-b11a-7003-bd04-1cf0d76f48ca",
  type: "page-type/module",
  slug: "health-import-checkpoint",
  definition: "how far an import got, kept on disk so the next run carries on from there",
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
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const healthImport = {
  id: "01a05c14-b11a-7002-a357-a2cd51c9856a",
  type: "page-type/module",
  slug: "health-import",
  definition: "how code makes a health sample from part of the Apple Health file",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A record naming a metric that is not stored is rejected rather than dropped in silence.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record naming no source is stored under the unattributed source.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every record is either converted or counted under the reason the record was refused.",
    },
  ],
  createdAt: "2026-09-01T08:27:35.066Z",
  updatedAt: "2026-10-30T15:44:28.155Z",
} as const satisfies Module

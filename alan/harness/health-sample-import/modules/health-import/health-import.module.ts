import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const healthImport = {
  id: "01a05c14-b11a-7002-a357-a2cd51c9856a",
  type: "page-type/module",
  slug: "health-import",
  definition: "an exported record turned into a stored sample, and what is counted on the way",
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
} as const satisfies Module

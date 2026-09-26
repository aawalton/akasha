import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionMetrics = {
  id: "01a06152-c2cb-7faa-af35-b220143e5186",
  type: "page-type/module",
  slug: "companion-metrics",
  definition: "every companion metric put into one table, keyed by metric id",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is read from the stat pages whose subject is companion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion stat is handed the formula filed under its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Asking for the table before anything has held it is refused.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A metric with a formula is worked out after every metric the formula reads.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No companion build hash has a metric's place in this table.",
    },
  ],
} as const satisfies Module

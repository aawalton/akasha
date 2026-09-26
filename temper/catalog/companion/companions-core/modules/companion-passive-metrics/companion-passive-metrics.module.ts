import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionPassiveMetrics = {
  id: "01a06110-abe3-7715-9a32-c5e21285cb2e",
  type: "page-type/module",
  slug: "companion-passive-metrics",
  definition: "the metrics a companion passive raises, each named for what it changes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive metric's name is read from its page rather than from a copy in code.",
    },
  ],
} as const satisfies Module

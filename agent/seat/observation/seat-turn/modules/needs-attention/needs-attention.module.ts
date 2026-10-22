import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const needsAttention = {
  id: "01a0defb-9e02-7601-bb88-b9d57f458c08",
  type: "page-type/module",
  slug: "needs-attention",
  definition: "how code keeps whether what an agent writes to Alan needs Alan",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value the seat already holds is not written again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat with no page is written nothing.",
    },
  ],
  createdAt: "2026-09-26T18:30:27.074Z",
  updatedAt: "2026-10-22T15:13:17.860Z",
} as const satisfies Module

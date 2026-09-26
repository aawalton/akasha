import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const needsAttention = {
  id: "01a0defb-9e02-7601-bb88-b9d57f458c08",
  type: "page-type/module",
  slug: "needs-attention",
  definition: "how code keeps whether a seat's last turn asked Alan for something",
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
} as const satisfies Module

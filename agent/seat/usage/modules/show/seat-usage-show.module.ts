import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatUsageShow = {
  id: "01a069bd-bdc5-74d2-b135-f04d0eea7a75",
  type: "page-type/module",
  slug: "seat-usage-show",
  definition: "how code shows the model and the context tokens a seat uses",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The model is written out as the id its model version states.",
    },
  ],
  createdAt: "2026-09-04T00:07:17.701Z",
  updatedAt: "2026-10-30T14:40:14.398Z",
} as const satisfies Module

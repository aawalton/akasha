import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatUsageShow = {
  id: "01a069bd-bdc5-74d2-b135-f04d0eea7a75",
  type: "page-type/module",
  slug: "seat-usage-show",
  definition: "this seat's model and context-token reading, written out as a JSON line",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The model is written out as the id its model version states.",
    },
  ],
  createdAt: "2026-09-04T00:07:17.701Z",
  updatedAt: "2026-09-24T18:44:07.000Z",
} as const satisfies Module

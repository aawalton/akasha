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
} as const satisfies Module

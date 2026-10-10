import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const optimisticMutation = {
  id: "01a05b69-454a-7b13-a861-a18e0f5f1b8c",
  type: "page-type/module",
  slug: "optimistic-mutation",
  definition: "a page write shown before it lands and settled once it does",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A write the screen shows no change for is still sent, after the row's earlier writes.",
    },
  ],
  createdAt: "2026-09-01T05:20:20.810Z",
  updatedAt: "2026-10-10T12:55:38.705Z",
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatUsage = {
  id: "01a0687b-3c96-7000-be32-deed725bb134",
  type: "page-type/module",
  slug: "seat-usage",
  definition: "the model and the context tokens a seat uses",
  parts: ["module/seat-usage-keep", "module/seat-usage-show", "module/typing-minutes"],
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading is taken from the values the statusline payload states and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number the payload states is kept as the text of that number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value the payload does not state is not written over the value that stands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty string is no reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat keeps the model version its model id names rather than the id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A model id no model version states is not kept.",
    },
  ],
  createdAt: "2026-09-03T18:15:02.038Z",
  updatedAt: "2026-10-30T14:39:20.945Z",
} as const satisfies Module

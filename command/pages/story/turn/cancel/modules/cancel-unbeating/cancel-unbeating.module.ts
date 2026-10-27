import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const cancelUnbeating = {
  id: "01a17fa9-769f-7daa-a79d-814a182476e8",
  type: "page-type/module",
  slug: "cancel-unbeating",
  definition: "the changes a cancel takes back off the pages a turn's shown beats changed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cancel takes back exactly the changes of the beats already shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number goes back to the value the turn's first change on it started from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A history loses the turn's lines, and no value is read off the line before them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page a shown beat made is taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat not yet shown wrote nothing, so nothing of it is taken back.",
    },
  ],
  createdAt: "2026-10-27T23:19:34.815Z",
  updatedAt: "2026-10-27T23:19:34.815Z",
} as const satisfies Module

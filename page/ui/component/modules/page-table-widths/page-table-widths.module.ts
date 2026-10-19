import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageTableWidths = {
  id: "01a05cce-25ec-76e9-9d53-768bfd67f3c6",
  type: "page-type/module",
  slug: "page-table-widths",
  definition: "the width a table column is drawn at, worked out from the values in it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A column of records holding links is as wide as the links a row draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A column is as wide as the longest value in it, up to a ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The title column also holds the mark drawn before a title.",
    },
  ],
  createdAt: "2026-09-01T11:50:09.132Z",
  updatedAt: "2026-10-19T13:15:16.530Z",
} as const satisfies Module

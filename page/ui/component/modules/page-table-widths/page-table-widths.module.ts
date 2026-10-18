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
  ],
  createdAt: "2026-09-01T11:50:09.132Z",
  updatedAt: "2026-10-18T16:06:04.201Z",
} as const satisfies Module

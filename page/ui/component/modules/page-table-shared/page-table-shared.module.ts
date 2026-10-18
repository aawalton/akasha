import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageTableShared = {
  id: "01a05c40-2194-7206-9127-bff9ebf4b3ab",
  type: "page-type/module",
  slug: "page-table-shared",
  definition: "Names the title column, the actions column width, and the shape of a table column.",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The title column is named by `title`, the key every page type declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view naming the title column among its properties names a key its type has.",
    },
  ],
  createdAt: "2026-09-01T09:15:01.908Z",
  updatedAt: "2026-10-18T20:27:17.782Z",
} as const satisfies Module

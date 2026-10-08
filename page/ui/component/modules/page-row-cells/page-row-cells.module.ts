import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageRowCells = {
  id: "01a0a104-7afd-734b-8ebb-f7f7d03710d4",
  type: "page-type/module",
  slug: "page-row-cells",
  definition: "the cells a page is shown as in a table, drawn by that page's own page type",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page no page type above it draws takes the cells beside page.",
    },
  ],
  createdAt: "2026-09-14T17:43:40.541Z",
  updatedAt: "2026-09-22T10:06:58.000Z",
} as const satisfies Module

import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const pageRowCells = {
  id: "01a0a104-7afd-734b-8ebb-f7f7d03710d4",
  type: "module",
  slug: "page-row-cells",
  definition: "the cells one page is shown as in a table, drawn by that page's own page type",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page no page type above it draws takes the cells beside page.",
    },
  ],
} as const satisfies Module

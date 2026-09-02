import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksBookData22 = {
  id: "01a0617f-9268-77f3-a4ec-5ab4cfe6d31e",
  pageTypeSlug: "module",
  slug: "lorebooks-book-data-22",
  definition: "one run of the Eidetic Memory book table, in the order the whole table names them",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These records are one unbroken run of the whole table's order.",
    },
    {
      invariantKind: "departure",
      statement: "This run is the add-on's own source rather than anything akasha derives.",
    },
  ],
} as const satisfies Module

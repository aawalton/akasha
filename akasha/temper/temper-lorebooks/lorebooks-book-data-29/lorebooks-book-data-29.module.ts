import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksBookData29 = {
  id: "01a0617f-926a-729f-8209-7a13f12747c5",
  pageTypeSlug: "module",
  slug: "lorebooks-book-data-29",
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

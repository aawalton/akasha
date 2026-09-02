import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksBookData68 = {
  id: "01a06180-9f41-7ece-9677-13fb49b55e21",
  pageTypeSlug: "module",
  slug: "lorebooks-book-data-68",
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

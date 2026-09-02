import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksBookData36 = {
  id: "01a0617f-926c-796c-85a6-3a91434d2ffb",
  pageTypeSlug: "module",
  slug: "lorebooks-book-data-36",
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

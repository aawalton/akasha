import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksLibraryData04 = {
  id: "01a06181-3844-7039-bb41-060f9b6cf546",
  pageTypeSlug: "module",
  slug: "lorebooks-library-data-04",
  definition:
    "one run of the Eidetic Memory collection table, in the order the whole table names them",
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

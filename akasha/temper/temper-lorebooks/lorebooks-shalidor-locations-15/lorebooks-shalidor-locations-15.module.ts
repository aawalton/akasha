import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksShalidorLocations15 = {
  id: "01a06181-3842-72dd-a5f6-7ad4f9af4829",
  pageTypeSlug: "module",
  slug: "lorebooks-shalidor-locations-15",
  definition:
    "one run of the Shalidor's Library location table, in the order the whole table names it",
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

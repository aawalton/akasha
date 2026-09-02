import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksShalidorLocations09 = {
  id: "01a06181-3840-7e64-98f0-61f47074061c",
  pageTypeSlug: "module",
  slug: "lorebooks-shalidor-locations-09",
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

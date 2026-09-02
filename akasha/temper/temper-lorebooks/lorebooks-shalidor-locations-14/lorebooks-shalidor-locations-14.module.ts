import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksShalidorLocations14 = {
  id: "01a06181-3841-7add-b7df-666251b4288b",
  pageTypeSlug: "module",
  slug: "lorebooks-shalidor-locations-14",
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

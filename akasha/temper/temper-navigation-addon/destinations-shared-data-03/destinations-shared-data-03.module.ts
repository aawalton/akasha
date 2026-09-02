import type { Module } from "@akasha/code-system/module"

export const destinationsSharedData03 = {
  id: "01a06269-29e2-76b6-af17-b9c0973267ba",
  pageTypeSlug: "module",
  slug: "destinations-shared-data-03",
  definition: "one run of the shared achievement rows by zone, and the stables, docks and portals",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      invariantKind: "departure",
      statement: "The run is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module

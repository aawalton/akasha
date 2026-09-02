import type { Module } from "@akasha/code-system/module"

export const destinationsSharedData06 = {
  id: "01a06269-29e5-7548-b438-2ae3f27bac43",
  pageTypeSlug: "module",
  slug: "destinations-shared-data-06",
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

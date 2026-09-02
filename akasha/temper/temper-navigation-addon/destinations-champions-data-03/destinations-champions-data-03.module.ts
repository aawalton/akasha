import type { Module } from "@akasha/code-system/module"

export const destinationsChampionsData03 = {
  id: "01a06269-29b5-7cab-9231-d5f3f847574b",
  pageTypeSlug: "module",
  slug: "destinations-champions-data-03",
  definition: "one run of the champion (dolmen and world boss) achievement rows by zone",
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

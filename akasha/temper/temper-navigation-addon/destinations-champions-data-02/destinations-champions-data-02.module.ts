import type { Module } from "@akasha/code-system/module"

export const destinationsChampionsData02 = {
  id: "01a06269-29b4-73b2-8c68-bb08b7637bba",
  pageTypeSlug: "module",
  slug: "destinations-champions-data-02",
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

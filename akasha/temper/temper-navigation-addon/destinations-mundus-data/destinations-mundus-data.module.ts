import type { Module } from "@akasha/code-system/module"

export const destinationsMundusData = {
  id: "01a06269-29b9-7e03-beb8-590215cb417d",
  pageTypeSlug: "module",
  slug: "destinations-mundus-data",
  definition: "the mundus stones by zone",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module

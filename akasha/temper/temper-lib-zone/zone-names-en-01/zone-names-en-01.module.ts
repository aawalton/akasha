import type { Module } from "@akasha/code-system/module"

export const zoneNamesEn01 = {
  id: "01a061e7-930b-7425-b850-51ba9661e261",
  pageTypeSlug: "module",
  slug: "zone-names-en-01",
  definition: "part 01 of every zone's name in en",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module

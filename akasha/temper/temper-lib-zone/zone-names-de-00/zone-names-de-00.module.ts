import type { Module } from "@akasha/code-system/module"

export const zoneNamesDe00 = {
  id: "01a061e7-9305-7231-96d3-35f40793a52e",
  pageTypeSlug: "module",
  slug: "zone-names-de-00",
  definition: "part 00 of every zone's name in de",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module

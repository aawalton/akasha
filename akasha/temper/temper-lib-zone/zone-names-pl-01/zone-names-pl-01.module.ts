import type { Module } from "@akasha/code-system/module"

export const zoneNamesPl01 = {
  id: "01a061e7-931d-7b6d-86bc-d103a71afaad",
  pageTypeSlug: "module",
  slug: "zone-names-pl-01",
  definition: "part 01 of every zone's name in pl",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module

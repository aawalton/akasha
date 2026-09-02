import type { Module } from "@akasha/code-system/module"

export const zoneNamesEs03 = {
  id: "01a061e7-9311-75a0-9f9c-5ab615adcbab",
  pageTypeSlug: "module",
  slug: "zone-names-es-03",
  definition: "part 03 of every zone's name in es",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module

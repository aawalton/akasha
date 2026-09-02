import type { Module } from "@akasha/code-system/module"

export const zoneNamesEs02 = {
  id: "01a061e7-9310-75ab-98b9-8026f78c6f11",
  pageTypeSlug: "module",
  slug: "zone-names-es-02",
  definition: "part 02 of every zone's name in es",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module

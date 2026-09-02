import type { Module } from "@akasha/code-system/module"

export const zoneNamesDe02 = {
  id: "01a061e7-9307-7359-b95a-c4fa4eaabccc",
  pageTypeSlug: "module",
  slug: "zone-names-de-02",
  definition: "part 02 of every zone's name in de",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module

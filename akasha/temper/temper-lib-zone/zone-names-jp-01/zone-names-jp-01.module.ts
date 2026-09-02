import type { Module } from "@akasha/code-system/module"

export const zoneNamesJp01 = {
  id: "01a061e7-9318-7c30-ac9c-4fe18ab83797",
  pageTypeSlug: "module",
  slug: "zone-names-jp-01",
  definition: "part 01 of every zone's name in jp",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module

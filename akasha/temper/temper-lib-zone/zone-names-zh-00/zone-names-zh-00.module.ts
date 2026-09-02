import type { Module } from "@akasha/code-system/module"

export const zoneNamesZh00 = {
  id: "01a061e7-9325-732f-9717-e520a16841fd",
  pageTypeSlug: "module",
  slug: "zone-names-zh-00",
  definition: "part 00 of every zone's name in zh",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module

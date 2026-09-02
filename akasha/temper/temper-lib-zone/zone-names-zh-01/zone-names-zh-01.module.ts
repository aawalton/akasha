import type { Module } from "@akasha/code-system/module"

export const zoneNamesZh01 = {
  id: "01a061e7-9326-718e-b42c-99bc9f7896d5",
  pageTypeSlug: "module",
  slug: "zone-names-zh-01",
  definition: "part 01 of every zone's name in zh",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module

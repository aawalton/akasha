import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const geoapify = {
  id: "01a05c48-deeb-7002-a7d6-912bcaf143d2",
  type: "module",
  slug: "geoapify",
  definition: "the geoapify url a place name's autocomplete is asked for by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A url is built without a request being made.",
    },
  ],
} as const satisfies Module

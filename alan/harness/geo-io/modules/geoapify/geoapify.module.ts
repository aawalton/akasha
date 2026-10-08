import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const geoapify = {
  id: "01a05c48-deeb-7002-a7d6-912bcaf143d2",
  type: "page-type/module",
  slug: "geoapify",
  definition: "the geoapify url asking for a place name's autocomplete",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A url is built without a request being made.",
    },
  ],
  createdAt: "2026-09-01T09:24:34.667Z",
  updatedAt: "2026-09-22T13:54:48.000Z",
} as const satisfies Module

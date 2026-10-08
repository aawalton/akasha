import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsShrineIcon = {
  id: "01a06269-2aea-740e-8964-1601c38c8591",
  type: "page-type/module",
  slug: "map-pins-shrine-icon",
  definition: "the icon of each shrine",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.570Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module

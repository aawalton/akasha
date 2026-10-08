import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiCasts = {
  id: "01a0623c-2df8-71c1-ba4a-234f0ad1e08b",
  type: "page-type/module",
  slug: "sets-search-ui-casts",
  definition: "the narrowings for the untyped values the search window handles",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every narrowing here is an unchecked cast.",
    },
  ],
  createdAt: "2026-09-02T13:08:26.232Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module

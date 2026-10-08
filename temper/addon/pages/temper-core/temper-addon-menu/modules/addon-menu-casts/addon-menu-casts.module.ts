import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuCasts = {
  id: "01a06100-0000-7000-8000-000000000001",
  type: "page-type/module",
  slug: "addon-menu-casts",
  definition: "the unchecked conversions from unknown to each typed shape the library handles",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every cast function performs a bare type assertion.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No cast validates the value the cast is handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Casts are collected in one module rather than written at each call site.",
    },
  ],
  createdAt: "2026-09-02T07:23:05.088Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module

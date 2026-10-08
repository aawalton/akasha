import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const jsonValue = {
  id: "01a05d38-69c2-7d28-9ad0-6afae06f9402",
  type: "page-type/module",
  slug: "json-value",
  definition: "what a JSON value is, said as a type",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This module names nothing.",
    },
  ],
  createdAt: "2026-09-01T13:46:13.314Z",
  updatedAt: "2026-09-15T19:48:30.000Z",
} as const satisfies Module

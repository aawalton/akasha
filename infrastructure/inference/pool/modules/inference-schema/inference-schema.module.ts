import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inferenceSchema = {
  id: "01a0685d-4b35-7000-a89c-fa9904f3e21d",
  type: "page-type/module",
  slug: "inference-schema",
  definition: "what a declared inference host holds, and what a host says it is holding",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here shapes a service, which a page type shapes instead.",
    },
  ],
  createdAt: "2026-09-03T17:42:19.701Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module

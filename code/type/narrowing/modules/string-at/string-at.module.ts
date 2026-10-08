import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stringAt = {
  id: "01a05cc9-029c-7f57-8f4e-de247a60828d",
  type: "page-type/module",
  slug: "string-at",
  definition: "the string a record holds under a key, or nothing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty string is answered rather than read as nothing.",
    },
  ],
  createdAt: "2026-09-01T11:44:32.412Z",
  updatedAt: "2026-09-15T19:48:30.000Z",
} as const satisfies Module

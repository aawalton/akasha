import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stringIn = {
  id: "01a08e46-4a99-7249-b10c-2177c0d3079d",
  type: "page-type/module",
  slug: "string-in",
  definition: "the string a value holds, or nothing",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is no string holds no string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty string is answered rather than read as nothing.",
    },
  ],
  createdAt: "2026-09-11T02:22:46.425Z",
  updatedAt: "2026-09-15T19:48:30.000Z",
} as const satisfies Module

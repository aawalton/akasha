import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stringsIn = {
  id: "01a09098-65cc-71fb-95a6-57732926c1c8",
  type: "page-type/module",
  slug: "strings-in",
  definition: "the strings a value holds, in the order that value holds them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is no array holds no strings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry that is no string is dropped rather than refusing the whole value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty string is an entry rather than read as nothing.",
    },
  ],
  createdAt: "2026-09-11T13:11:41.772Z",
  updatedAt: "2026-09-15T19:48:30.000Z",
} as const satisfies Module

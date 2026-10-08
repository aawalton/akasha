import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const isCallback = {
  id: "01a08e19-c569-71cc-8644-64f32991852e",
  type: "page-type/module",
  slug: "is-callback",
  definition: "whether a value that may be a callback is one rather than a plain value",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Only Lua's own `type` tells a function from a value.",
    },
  ],
  createdAt: "2026-09-11T01:34:08.745Z",
  updatedAt: "2026-09-21T22:10:28.000Z",
} as const satisfies Module

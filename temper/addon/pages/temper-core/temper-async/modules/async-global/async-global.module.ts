import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const asyncGlobal = {
  id: "01a0606a-1c55-7f79-8994-453c4b232ba0",
  type: "page-type/module",
  slug: "async-global",
  definition: "the library's global name",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The library table is published under the addon name.",
    },
  ],
} as const satisfies Module

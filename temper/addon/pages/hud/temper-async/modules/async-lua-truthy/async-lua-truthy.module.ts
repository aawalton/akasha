import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const asyncLuaTruthy = {
  id: "01a0606a-1c55-7be8-906d-f6520a9cb651",
  type: "page-type/module",
  slug: "async-lua-truthy",
  definition: "whether Lua would read a value as true",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only nil and false are false in Lua.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Zero and the empty string are true.",
    },
  ],
} as const satisfies Module

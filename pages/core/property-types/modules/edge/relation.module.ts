import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const relation = {
  id: "01a05b92-a9c7-7221-b4c6-4f496623711d",
  type: "module",
  slug: "relation",
  definition: "the operations a relation property supports",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page type a relation points at is read here rather than by each reader.",
    },
  ],
} as const satisfies Module

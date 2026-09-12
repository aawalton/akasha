import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const select = {
  id: "01a05b92-a9c7-7a3b-8ead-0439cf3ee357",
  type: "module",
  slug: "select",
  definition: "the property type storing a single choice from a list of options",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The options a property declares are read here rather than by each reader.",
    },
  ],
} as const satisfies Module

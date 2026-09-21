import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsConstSettypes = {
  id: "01a061d6-3e21-7c23-b9d0-2f45a894170f",
  type: "page-type/module",
  slug: "lib-sets-const-settypes",
  definition: "the fifteen kinds a gear set can be, and the item a set piece can be",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each set type name is declared as a game global rather than a member of a table.",
    },
  ],
} as const satisfies Module

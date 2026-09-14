import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const getByRelation = {
  id: "01a05bd6-c532-7458-8bab-30756e7d80ce",
  type: "module",
  slug: "get-by-relation",
  definition: "whether a filter asks for the pages naming one page",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the pages a filter like that asks for.",
    },
  ],
} as const satisfies Module

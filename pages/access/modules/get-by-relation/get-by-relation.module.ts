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
      statement: "Nothing here reaches pages; a filter like that is answered by reading the files.",
    },
  ],
} as const satisfies Module

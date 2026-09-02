import type { Module } from "@akasha/code-system/module"

export const libSetsLocRestStringsFr = {
  id: "01a061d7-7bbc-7f0c-bbdf-e97e3a3f9882",
  pageTypeSlug: "module",
  slug: "lib-sets-loc-rest-strings-fr",
  definition: "the library's own interface text in French",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Text absent here is taken from the English table.",
    },
  ],
} as const satisfies Module

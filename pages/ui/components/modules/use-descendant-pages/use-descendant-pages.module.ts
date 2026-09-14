import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const useDescendantPages = {
  id: "01a05cce-25ec-7573-afac-aed8bece2063",
  type: "module",
  slug: "use-descendant-pages",
  definition: "the pages under a page, gathered across the types beneath it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A filter is put to each page type beneath this one and the answers are merged.",
    },
    {
      invariantKind: "departure",
      statement: "A gather that goes wrong carries its reason rather than an empty list of pages.",
    },
  ],
} as const satisfies Module

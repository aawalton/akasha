import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersCollectorMerge = {
  id: "01a062e9-b6fe-7010-ab1f-3d8afc6a9e8e",
  pageTypeSlug: "module",
  slug: "characters-collector-merge",
  definition: "what a collector already stored joined with what it has just read",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A collector never drops what an earlier read stored and this read cannot see.",
    },
  ],
} as const satisfies Module

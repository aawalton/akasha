import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setCategories = {
  id: "01a0616f-8e15-7812-a6e6-cca332a9a6e5",
  pageTypeSlug: "module",
  slug: "set-categories",
  definition: "where a gear set is found, and the sets sorted under each",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the set category pages rather than by hand.",
    },
    {
      invariantKind: "upkeep",
      statement: "The generator writes this table outside akasha.",
    },
    {
      invariantKind: "upkeep",
      statement: "Both copies of this table move together.",
    },
  ],
} as const satisfies Module

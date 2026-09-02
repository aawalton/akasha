import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const collectiblesCatalogSchema = {
  id: "01a06076-5ea6-7c0b-b801-72a737a925d6",
  pageTypeSlug: "module",
  slug: "collectibles-catalog-schema",
  definition: "the zod schema reading the collectibles catalog out of saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A category holds sub categories that hold collectibles.",
    },
    {
      invariantKind: "departure",
      statement: "A general sub category is optional on a category.",
    },
    {
      invariantKind: "departure",
      statement: "A catalog key arrives as text and is coerced to a number.",
    },
    {
      invariantKind: "departure",
      statement: "The inferred type is checked against the shape in `temper-capture-shapes`.",
    },
  ],
} as const satisfies Module

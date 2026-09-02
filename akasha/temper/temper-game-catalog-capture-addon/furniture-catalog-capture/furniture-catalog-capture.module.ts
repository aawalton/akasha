import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const furnitureCatalogCapture = {
  id: "01a060e2-3184-7486-8bde-685c51a8fc83",
  pageTypeSlug: "module",
  slug: "furniture-catalog-capture",
  definition:
    "the housing furniture categories, read out of the client into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "A furniture category holds the subcategories of that category.",
    },
    {
      invariantKind: "departure",
      statement: "A category name and a subcategory name are both read by category id.",
    },
  ],
} as const satisfies Module

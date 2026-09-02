import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const recipeCatalogSchema = {
  id: "01a06076-5ea9-7717-bd35-d68b08aa506f",
  pageTypeSlug: "module",
  slug: "recipe-catalog-schema",
  definition: "the zod schema reading the recipe catalog out of saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A recipe list holds the recipes in that list.",
    },
    {
      invariantKind: "departure",
      statement: "A recipe carries only its name.",
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

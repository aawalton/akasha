import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const traitResearchCatalogSchema = {
  id: "01a06076-5ea9-7eaa-9ac6-2b3b92426d46",
  pageTypeSlug: "module",
  slug: "trait-research-catalog-schema",
  definition: "the zod schema reading the trait research catalog out of saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A craft type holds research lines that hold traits.",
    },
    {
      invariantKind: "departure",
      statement: "A trait carries only its name.",
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

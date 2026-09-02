import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const tributeCatalogSchema = {
  id: "01a06076-5ea7-7930-8509-86381d5f66d2",
  pageTypeSlug: "module",
  slug: "tribute-catalog-schema",
  definition: "the zod schema reading the tribute patron catalog out of saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A patron holds the cards that patron gives.",
    },
    {
      invariantKind: "departure",
      statement: "A card names its base form and its upgraded form.",
    },
    {
      invariantKind: "departure",
      statement: "A catalog key arrives as text and is coerced to a number.",
    },
    {
      invariantKind: "departure",
      statement: "Each level is checked against its shape in `temper-capture-shapes`.",
    },
  ],
} as const satisfies Module

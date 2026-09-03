import type { PageProperty } from "../page-properties/page-property.page-type.ts"
import type { PageType } from "../page-types/page-type.page-type.ts"
import type { Formula } from "./properties/formula.text-property.ts"

export type FormulaProperty = PageProperty & {
  formula: Formula
}

export const formulaProperty = {
  id: "01a06553-4713-7003-86f0-7af8d36db81d",
  pageTypeSlug: "page-type",
  slug: "formula-property",
  definition: "a page property worked out from the others",
  pluralSlug: "formula-properties",
  extendsSlug: "page-type/page-property",
  partSlugs: ["text-property/formula"],
  properties: [{ pagePropertySlug: "formula", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page carries no value for this property.",
    },
    {
      invariantKind: "departure",
      statement: "A page file stating one is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A query may answer with this property's key.",
    },
    {
      invariantKind: "departure",
      statement: "A formula answers the same over the same page however often it is asked.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing yet works a formula out at the reader.",
    },
  ],
} as const satisfies PageType

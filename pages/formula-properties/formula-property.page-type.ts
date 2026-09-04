import type { PageProperty } from "../page-properties/page-property.page-type.ts"
import type { PageType } from "../page-types/page-type.page-type.ts"
import type { Formula } from "./properties/formula.text-property.ts"
import type { Holds } from "./properties/holds.select-property.ts"

export type FormulaProperty = PageProperty & {
  formula: Formula
  holds: Holds
}

export const formulaProperty = {
  id: "01a06553-4713-7003-86f0-7af8d36db81d",
  pageTypeSlug: "page-type",
  slug: "formula-property",
  definition: "a page property worked out from the others",
  pluralSlug: "formula-properties",
  extendsSlug: ["page-type/page-property"],
  partSlugs: ["select-property/holds", "text-property/formula"],
  properties: [
    { pagePropertySlug: "formula", required: true, many: false },
    { pagePropertySlug: "holds", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page carries no value for this property.",
    },
    {
      invariantKind: "departure",
      statement: "A page file stating a value for a formula property is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A query may answer with this property's key.",
    },
    {
      invariantKind: "departure",
      statement: "A formula answers the same over one page however often the formula is asked.",
    },
    {
      invariantKind: "departure",
      statement: "A formula property states the kind of value its formula works out.",
    },
    {
      invariantKind: "departure",
      statement: "A formula answering another kind than the property states is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A reader works the formula out over the values the page carries.",
    },
    {
      invariantKind: "departure",
      statement: "A formula reading a refused formula is refused too.",
    },
    {
      invariantKind: "departure",
      statement: "A question naming a refused key is refused rather than answered empty.",
    },
    {
      invariantKind: "departure",
      statement: "A formula answering absent puts no key in the row.",
    },
  ],
} as const satisfies PageType

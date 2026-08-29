import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"
import type { Generator } from "./properties/generator.relation-property.ts"
import type { Unique } from "./properties/unique.relation-property.ts"

export type PageProperty = Domain & {
  generator?: Generator
  unique?: Unique
}

export type List<T> = readonly T[]

export const pageProperty = {
  id: "01a04dff-9d7d-7459-a8c0-e038dc7714c3",
  pageTypeSlug: "page-type",
  slug: "page-property",
  definition: "one value a page carries",
  pluralSlug: "page-properties",
  partSlugs: [
    "module/page-property-key",
    "number-property/max",
    "number-property/total",
    "relation-property/generator",
    "relation-property/unique",
  ],
  extendsSlug: "page-type/domain",
  properties: [
    { pagePropertySlug: "generator", required: false, many: false },
    { pagePropertySlug: "unique", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "What shape a property has is the page type it is, never a value it states.",
    },
    {
      invariantKind: "departure",
      statement: "A page property does not extend; only a page type does.",
    },
    {
      invariantKind: "departure",
      statement: "How many of a property a page carries is stated where it is declared, not here.",
    },
  ],
} as const satisfies PageType

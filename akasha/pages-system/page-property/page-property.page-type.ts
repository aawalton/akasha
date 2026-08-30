import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"
import type { Generator } from "./properties/generator.relation-property.ts"
import type { PropertySlug } from "./properties/property-slug.text-property.ts"
import type { Unique } from "./properties/unique.relation-property.ts"

export type PageProperty = Domain & {
  propertySlug: PropertySlug
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
    "text-property/property-slug",
  ],
  extendsSlug: "page-type/domain",
  properties: [
    { pagePropertySlug: "property-slug", required: true, many: false },
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
      statement: "A page property does not extend.",
    },
    {
      invariantKind: "departure",
      statement: "Only a page type does.",
    },
    {
      invariantKind: "departure",
      statement: "How many of a property a page carries is stated where it is declared, not here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property is reached by its slug and read by its key, and the two answer to different reaches.",
    },
  ],
} as const satisfies PageType

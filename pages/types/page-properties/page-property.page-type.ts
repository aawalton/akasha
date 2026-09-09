import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "../page-type.page-type.ts"
import type { Generator } from "./properties/generator.relation-property.ts"
import type { PropertySlug } from "./properties/property-slug.text-property.ts"
import type { Unique } from "./properties/unique.relation-property.ts"
import type { UniqueProperty } from "./properties/unique-property.relation-property.ts"

export type PageProperty = Domain & {
  propertySlug: PropertySlug
  generator?: Generator
  unique?: Unique
  uniqueProperty?: UniqueProperty
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
    "number-property/max-count",
    "number-property/max-length",
    "relation-property/generator",
    "relation-property/unique",
    "relation-property/unique-property",
    "text-property/property-slug",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "text-property/property-slug", required: true, many: false },
    { pagePropertySlug: "relation-property/generator", required: false, many: false },
    { pagePropertySlug: "relation-property/unique", required: false, many: false },
    { pagePropertySlug: "relation-property/unique-property", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A property's shape is the page type that property is rather than a value the property states.",
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
      statement:
        "How many values a page has is stated in the declaration rather than on the property.",
    },
    {
      invariantKind: "departure",
      statement: "A property is reached by its slug and read by its key.",
    },
    {
      invariantKind: "departure",
      statement: "The two answer to different reaches.",
    },
  ],
} as const satisfies PageType

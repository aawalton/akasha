import type { List } from "../../page-property/page-property.page-type.ts"
import type { Max } from "../../page-property/properties/max.number-property.ts"
import type { Total } from "../../page-property/properties/total.number-property.ts"
import type { RecordProperty } from "../../record-property/record-property.page-type.ts"
import type { PagePropertySlug } from "./page-property-slug.relation-property.ts"
import type { Required } from "./required.boolean-property.ts"
import type { Uncommitted } from "./uncommitted.boolean-property.ts"

export type Declaration =
  | {
      pagePropertySlug: PagePropertySlug
      required: Required
      many: false
      uncommitted?: Uncommitted
    }
  | {
      pagePropertySlug: PagePropertySlug
      required: Required
      many: true
      max: Max | null
      total?: Total | null
      uncommitted?: Uncommitted
    }

export type Properties = List<Declaration>

export const properties = {
  id: "01a04df3-6848-7e77-ba2c-9399e3f6a356",
  pageTypeSlug: "record-property",
  slug: "properties",
  propertySlug: "properties",
  definition: "the properties a page type adds, and the inherited ones it narrows",
  properties: [
    { pagePropertySlug: "page-property-slug", required: true, many: false },
    { pagePropertySlug: "required", required: true, many: false },
    { pagePropertySlug: "many", required: true, many: false },
    { pagePropertySlug: "max", required: false, many: false },
    { pagePropertySlug: "total", required: false, many: false },
    { pagePropertySlug: "uncommitted", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page type declares the properties it adds, and takes the rest from the type it extends.",
    },
    {
      invariantKind: "departure",
      statement:
        "An inherited property is restated only to narrow it: optional becomes required, and a max only falls.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a property is carried once or many times never changes.",
    },
    {
      invariantKind: "departure",
      statement: "What a property is belongs to the property, how it is carried belongs here.",
    },
    {
      invariantKind: "departure",
      statement: "Only a declaration carrying many states a max or a total.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value stands in the commit unless the declaration carrying it says it does not.",
    },
  ],
} as const satisfies RecordProperty

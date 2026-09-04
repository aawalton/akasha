import type { List } from "../../page-types/page-properties/page-property.page-type.ts"
import type { Max } from "../../page-types/page-properties/properties/max.number-property.ts"
import type { Total } from "../../page-types/page-properties/properties/total.number-property.ts"
import type { RecordProperty } from "../../record-properties/record-property.page-type.ts"
import type { DefaultValue } from "./default-value.text-property.ts"
import type { PagePropertySlug } from "./page-property-slug.relation-property.ts"
import type { Required } from "./required.boolean-property.ts"
import type { Secret } from "./secret.boolean-property.ts"
import type { Uncommitted } from "./uncommitted.boolean-property.ts"

export type Declaration =
  | {
      pagePropertySlug: PagePropertySlug
      required: Required
      many: false
      default?: DefaultValue
      uncommitted?: Uncommitted
      secret?: Secret
    }
  | {
      pagePropertySlug: PagePropertySlug
      required: Required
      many: true
      max: Max | null
      total?: Total | null
      uncommitted?: Uncommitted
      secret?: Secret
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
    { pagePropertySlug: "default-value", required: false, many: false },
    { pagePropertySlug: "max", required: false, many: false },
    { pagePropertySlug: "total", required: false, many: false },
    { pagePropertySlug: "uncommitted", required: false, many: false },
    { pagePropertySlug: "secret", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type declares the properties the page type adds.",
    },
    {
      invariantKind: "departure",
      statement: "A page type takes the rest from the type the page type extends.",
    },
    {
      invariantKind: "departure",
      statement: "Optional becomes required.",
    },
    {
      invariantKind: "departure",
      statement: "A max only falls.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a property is carried once or many times never changes.",
    },
    {
      invariantKind: "departure",
      statement: "What a property is belongs to the property.",
    },
    {
      invariantKind: "departure",
      statement: "How a property is carried belongs here.",
    },
    {
      invariantKind: "departure",
      statement: "Only a declaration carrying many values states a max or a total.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration saying `many` keeps every value in the page file.",
    },
    {
      invariantKind: "departure",
      statement: "Only a declaration carrying one value states a default.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value stands in the commit unless the declaration carrying it says it does not.",
    },
    {
      invariantKind: "departure",
      statement: "A value stands in the open unless the declaration carrying it says it does not.",
    },
  ],
} as const satisfies RecordProperty

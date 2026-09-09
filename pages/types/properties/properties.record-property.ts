import type { RecordProperty } from "../../record-properties/record-property.page-type.ts"
import type { List } from "../page-properties/page-property.page-type.ts"
import type { MaxCount } from "../page-properties/properties/max-count.number-property.ts"
import type { MaxLength } from "../page-properties/properties/max-length.number-property.ts"
import type { Unique } from "../page-properties/properties/unique.relation-property.ts"
import type { UniqueProperty } from "../page-properties/properties/unique-property.relation-property.ts"
import type { DefaultValue } from "./default-value.text-property.ts"
import type { FixedValue } from "./fixed-value.text-property.ts"
import type { PageProperty } from "./page-property.relation-property.ts"
import type { Required } from "./required.boolean-property.ts"
import type { Secret } from "./secret.boolean-property.ts"
import type { Uncommitted } from "./uncommitted.boolean-property.ts"

export type Declaration =
  | {
      pageProperty: PageProperty
      required: Required
      many: false
      default?: DefaultValue
      fixed?: FixedValue
      maxLength?: MaxLength
      uncommitted?: Uncommitted
      secret?: Secret
      unique?: Unique
      uniqueProperty?: UniqueProperty
    }
  | {
      pageProperty: PageProperty
      required: Required
      many: true
      maxCount: MaxCount | null
      maxLength?: MaxLength
      uncommitted?: Uncommitted
      secret?: Secret
      unique?: Unique
      uniqueProperty?: UniqueProperty
    }

export type Properties = List<Declaration>

export const properties = {
  id: "01a04df3-6848-7e77-ba2c-9399e3f6a356",
  pageTypeSlug: "record-property",
  slug: "properties",
  propertySlug: "properties",
  definition: "the properties a page type adds, and the inherited properties it narrows",
  properties: [
    { pageProperty: "relation-property/page-property", required: true, many: false },
    { pageProperty: "boolean-property/required", required: true, many: false },
    { pageProperty: "boolean-property/many", required: true, many: false },
    { pageProperty: "text-property/default-value", required: false, many: false },
    { pageProperty: "text-property/fixed-value", required: false, many: false },
    { pageProperty: "number-property/max-count", required: false, many: false },
    { pageProperty: "number-property/max-length", required: false, many: false },
    { pageProperty: "boolean-property/uncommitted", required: false, many: false },
    { pageProperty: "boolean-property/secret", required: false, many: false },
    { pageProperty: "relation-property/unique", required: false, many: false },
    { pageProperty: "relation-property/unique-property", required: false, many: false },
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
      statement: "A length only falls.",
    },
    {
      invariantKind: "departure",
      statement: "A unique kind only narrows.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration stating no unique kind takes the kind its property states.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a property is carried once or many times never changes.",
    },
    {
      invariantKind: "departure",
      statement: "The shape a property has belongs to the property.",
    },
    {
      invariantKind: "departure",
      statement: "How a property is carried belongs here.",
    },
    {
      invariantKind: "departure",
      statement: "Only a declaration with many values states a count.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration saying `many` keeps every value in the page file.",
    },
    {
      invariantKind: "departure",
      statement: "Only a declaration with one value states a default.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value stands in the commit unless the declaration with that value says that value does not.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value stands in the open unless the declaration with that value says that value does not.",
    },
  ],
} as const satisfies RecordProperty

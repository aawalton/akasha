import type { List } from "../../page-property/page-property.page-type.ts"
import type { RecordProperty } from "../../page-property/record-property.page-type.ts"
import type { Many } from "./many.boolean-property.ts"
import type { PagePropertySlug } from "./page-property-slug.relation-property.ts"
import type { Required } from "./required.boolean-property.ts"

export type Declaration = {
  propertySlug: PagePropertySlug
  required: Required
  many: Many
}

export type Properties = List<Declaration>

export const properties = {
  id: "01a04df3-6848-7e77-ba2c-9399e3f6a356",
  pageTypeSlug: "record-property",
  slug: "properties",
  definition: "the properties a page type adds to what it extends",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page type declares only the properties it adds, and takes the rest from the type it extends.",
    },
    {
      invariantKind: "departure",
      statement: "What a property is belongs to the property, how it is carried belongs here.",
    },
  ],
} as const satisfies RecordProperty

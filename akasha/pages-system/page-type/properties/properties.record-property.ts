import type { List } from "../../page-property/page-property.page-type.ts"
import type { Max } from "../../page-property/properties/max.number-property.ts"
import type { RecordProperty } from "../../page-property/record-property.page-type.ts"
import type { PagePropertySlug } from "./page-property-slug.relation-property.ts"
import type { Required } from "./required.boolean-property.ts"

export type Declaration =
  | { pagePropertySlug: PagePropertySlug; required: Required; many: false }
  | { pagePropertySlug: PagePropertySlug; required: Required; many: true; max: Max | null }

export type Properties = List<Declaration>

export const properties = {
  id: "01a04df3-6848-7e77-ba2c-9399e3f6a356",
  pageTypeSlug: "record-property",
  slug: "properties",
  definition: "the properties a page type adds to what it extends",
  properties: [
    { pagePropertySlug: "page-property-slug", required: true, many: false },
    { pagePropertySlug: "required", required: true, many: false },
    { pagePropertySlug: "many", required: true, many: false },
    { pagePropertySlug: "max", required: false, many: false },
  ],
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
    {
      invariantKind: "departure",
      statement: "Only a declaration carrying many states a max.",
    },
  ],
} as const satisfies RecordProperty

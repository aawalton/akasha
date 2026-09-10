import type { RecordProperty } from "../../record-properties/record-property.page-type.types.ts"
import type { ChildRelation } from "./child-relation.text-property.ts"
import type { ChildType } from "./child-type.relation-property.ts"

export type ChildCollection = {
  childType: ChildType
  childRelation: ChildRelation
}

export const childCollection = {
  id: "01a0683a-620a-7821-a81d-95fedabac32d",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "child-collection",
  propertySlug: "child-collection",
  definition: "the pages a page gathers, and the key by which each names the page gathering it",
  properties: [
    { pageProperty: "relation-property/child-type", required: true, many: false },
    { pageProperty: "text-property/child-relation", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page gathers pages of one page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "The gathered page names the page gathering that gathered page rather than the other way about.",
    },
    {
      invariantKind: "stopgap",
      statement: "Each key here repeats this record's name.",
    },
    {
      invariantKind: "stopgap",
      statement: "The reader outside names that key so.",
    },
  ],
} as const satisfies RecordProperty

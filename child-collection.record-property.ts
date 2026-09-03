import type { RecordProperty } from "../../record-properties/record-property.page-type.ts"
import type { ChildRelation } from "./child-relation.text-property.ts"
import type { ChildType } from "./child-type.relation-property.ts"

export type ChildCollection = {
  childType: ChildType
  childRelation: ChildRelation
}

export const childCollection = {
  id: "01a0683a-620a-7821-a81d-95fedabac32d",
  pageTypeSlug: "record-property",
  slug: "child-collection",
  propertySlug: "child-collection",
  definition: "the pages a page gathers, and the key by which each names the page gathering it",
  properties: [
    { pagePropertySlug: "child-type", required: true, many: false },
    { pagePropertySlug: "child-relation", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page gathers pages of one page type.",
    },
    {
      invariantKind: "departure",
      statement: "The gathered page names the page gathering it rather than the other way about.",
    },
    {
      invariantKind: "stopgap",
      statement: "Each key here repeats this record's name because the reader outside names it so.",
    },
  ],
} as const satisfies RecordProperty

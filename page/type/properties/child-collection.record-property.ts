import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const childCollection = {
  id: "01a0683a-620a-7821-a81d-95fedabac32d",
  type: "page-type/record-property",
  slug: "child-collection",
  propertySlug: "child-collection",
  definition: "the pages a page gathers, and the key by which each names the page gathering it",
  properties: [
    { pageProperty: "relation-property/child-type", required: true, many: false },
    { pageProperty: "text-property/child-relation", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page gathers pages of one page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The gathered page names the page gathering that gathered page rather than the other way about.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "Each key here repeats this record's name.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "The reader outside names that key so.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty

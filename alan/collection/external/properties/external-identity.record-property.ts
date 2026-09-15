import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const externalIdentity = {
  id: "01a09ba1-cc57-7d8f-8460-fd32ebb90bef",
  type: "record-property",
  slug: "external-identity",
  propertySlug: "external-identity",
  definition: "one provider's record of a collection, and what that provider calls it",
  properties: [
    { pageProperty: "select-property/source", required: true, many: false },
    { pageProperty: "text-property/external-id", required: false, many: false },
    { pageProperty: "url-property/external-link", required: false, many: false },
    { pageProperty: "calendar-date-property/last-synced-at", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A collection two providers hold a record of states two of these.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A provider holds one record of one collection.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every one of these names the provider it came from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every one of these states an id or a link.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sync reaches only the one naming the provider that answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One never synced states no moment it was synced at.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty

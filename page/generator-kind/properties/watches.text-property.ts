import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const watches = {
  id: "01a14fcf-6bd9-7ce1-b9a5-e2ade290f031",
  type: "page-type/text-property",
  slug: "watches",
  propertySlug: "watches",
  definition: "the key of the one value whose change a generated value is worked out again on",
  namesAPropertyKey: true,
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind watching a key works its value out only where that key's value changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind watching a key works out nothing for a page being created.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind watching a key works out an instant.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-18T16:19:16.055Z",
  updatedAt: "2026-10-18T16:19:16.055Z",
} as const satisfies TextProperty

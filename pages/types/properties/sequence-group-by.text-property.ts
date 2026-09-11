import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const sequenceGroupBy = {
  id: "01a062de-2001-7001-8470-331eaddff9ce",
  type: "text-property",
  slug: "sequence-group-by",
  propertySlug: "group-by",
  definition: "the key whose value gathers a page type's pages into one run",
  maxLength: 64,
  nameFormat: "name-format/lower-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key named here that the page type has no property for gathers nothing.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty

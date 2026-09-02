import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type SequenceGroupBy = string

export const sequenceGroupBy = {
  id: "01a062de-2001-7001-8470-331eaddff9ce",
  pageTypeSlug: "text-property",
  slug: "sequence-group-by",
  propertySlug: "group-by",
  definition: "the key whose value gathers a page type's pages into one run",
  max: 64,
  nameFormatSlug: "name-format/lower-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key named here that the page type carries no property for gathers nothing.",
    },
  ],
} as const satisfies TextProperty

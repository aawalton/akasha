import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type SequenceDirection = string

export const sequenceDirection = {
  id: "01a062de-2001-7003-a875-d6a5b29e480d",
  pageTypeSlug: "text-property",
  slug: "sequence-direction",
  propertySlug: "direction",
  definition: "whether a run of pages is sorted upward or downward",
  max: 4,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type naming no direction has its run sorted upward.",
    },
    {
      invariantKind: "stopgap",
      statement: "The two directions a run can take do not stand as pages.",
    },
  ],
} as const satisfies TextProperty

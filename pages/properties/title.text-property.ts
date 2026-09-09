import type { TextProperty } from "@akasha/pages/text-property"

export type Title = string

export const title = {
  id: "01a05fac-7582-7694-ae1f-480fe66ea27b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "title",
  propertySlug: "title",
  definition: "the name a thing is shown under",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A title is written as the name is written rather than as a slug is written.",
    },
  ],
} as const satisfies TextProperty

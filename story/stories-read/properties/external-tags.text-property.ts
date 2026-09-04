import type { TextProperty } from "@akasha/pages-system/text-property"

export type ExternalTags = string

export const externalTags = {
  id: "01a06554-d8bd-7dd9-bc8b-f7015c1af16c",
  pageTypeSlug: "text-property",
  slug: "external-tags",
  propertySlug: "external-tags",
  definition: "a word the source files a collection under",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tag here is the source's own rather than the person's.",
    },
    {
      invariantKind: "departure",
      statement: "A tag is written as the source writes the tag rather than as a slug is written.",
    },
  ],
} as const satisfies TextProperty

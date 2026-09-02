import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type FileName = string

export const fileName = {
  id: "01a0585d-233d-7e12-8214-d5f3f602412f",
  pageTypeSlug: "text-property",
  slug: "file-name",
  propertySlug: "file-name",
  definition: "the name a property's file stands under",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This file name is the whole name rather than an extension.",
    },
  ],
} as const satisfies TextProperty

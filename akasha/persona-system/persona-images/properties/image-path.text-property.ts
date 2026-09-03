import type { TextProperty } from "@akasha/pages-system/text-property"

export type ImagePath = string

export const imagePath = {
  id: "01a0655b-4a9b-7000-be1d-ee856388970b",
  pageTypeSlug: "text-property",
  slug: "image-path",
  propertySlug: "image-path",
  definition: "where a picture stands, read against the root it names",
  max: 300,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path already absolute is read as it stands rather than against a root.",
    },
    {
      invariantKind: "departure",
      statement: "A path is written as the file is named rather than as a slug is written.",
    },
  ],
} as const satisfies TextProperty

import type { TextProperty } from "@akasha/pages/text-property"

export type ImagePath = string

export const imagePath = {
  id: "01a0655b-4a9b-7000-be1d-ee856388970b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "image-path",
  propertySlug: "image-path",
  definition: "where a picture is, read against the root it names",
  maxLength: 300,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path already absolute is read as that path is rather than against a root.",
    },
    {
      invariantKind: "departure",
      statement: "A path is written as the file is named rather than as a slug is written.",
    },
  ],
} as const satisfies TextProperty

import type { TextProperty } from "@akasha/pages-system/text-property"

export type ImageRoot = string

export const imageRoot = {
  id: "01a0655b-4a9b-7001-b814-afe1edf9866f",
  pageTypeSlug: "text-property",
  slug: "image-root",
  propertySlug: "image-root",
  definition: "the name of the place a picture's path is read against",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A root naming no place falls back to the first place given.",
    },
  ],
} as const satisfies TextProperty

import type { TextProperty } from "@akasha/pages-system/text-property"

export type Effect = string

export const effect = {
  id: "01a05fb0-3ceb-76f9-a671-f1a905b3e99c",
  pageTypeSlug: "text-property",
  slug: "effect",
  propertySlug: "effect",
  definition: "what a thing does, said as the game says it",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty

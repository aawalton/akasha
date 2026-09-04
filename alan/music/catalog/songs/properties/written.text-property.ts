import type { TextProperty } from "@akasha/pages-system/text-property"

export type Written = "solo" | "collab"

export const written = {
  id: "01a06243-144b-7009-8017-c942088ed2c7",
  pageTypeSlug: "text-property",
  slug: "written",
  propertySlug: "written",
  definition: "whether the artist wrote the song alone or with others",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty

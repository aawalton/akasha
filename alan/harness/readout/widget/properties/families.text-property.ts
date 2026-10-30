import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const families = {
  id: "01a05480-1c89-7261-a8c7-0538e7ae019b",
  type: "page-type/text-property",
  slug: "families",
  propertySlug: "families",
  definition: "the sizes a readout widget can take",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-08-30T21:07:57.193Z",
  updatedAt: "2026-10-30T16:02:35.435Z",
} as const satisfies TextProperty

import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const sectionAnchor = {
  id: "01a0d5a8-c966-7afe-8c13-a6939da21b7e",
  type: "page-type/text-property",
  slug: "section-anchor",
  propertySlug: "anchor",
  definition: "the name a link gives to reach one section of a site document",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-24T23:03:23.750Z",
  updatedAt: "2026-09-24T23:03:48.000Z",
} as const satisfies TextProperty

import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const actionLayer = {
  id: "01a18478-1f89-7929-bef3-12fb4d81d5de",
  type: "page-type/text-property",
  slug: "action-layer",
  propertySlug: "layer",
  definition: "the layer of the game's controls an action is bound in",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-10-28T21:43:47.335Z",
  updatedAt: "2026-10-28T21:43:47.335Z",
} as const satisfies TextProperty

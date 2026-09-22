import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const eventAliases = {
  id: "01a0658b-9f41-7a18-8fa2-3605f3a3bf72",
  type: "page-type/text-property",
  slug: "event-aliases",
  propertySlug: "aliases",
  definition: "the event's other names in the story",
  maxLength: 50,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

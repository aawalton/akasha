import type { TextProperty } from "@akasha/pages-system/text-property"

export type EventAliases = string

export const eventAliases = {
  id: "01a0658b-9f41-7a18-8fa2-3605f3a3bf72",
  pageTypeSlug: "text-property",
  slug: "event-aliases",
  propertySlug: "aliases",
  definition: "the other names the story calls it by",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty

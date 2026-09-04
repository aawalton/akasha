import type { TextProperty } from "@akasha/pages-system/text-property"

export type HelpArgNote = string

export const helpArgNote = {
  id: "01a06958-32aa-7000-a78e-c15a71675418",
  pageTypeSlug: "text-property",
  slug: "help-arg-note",
  propertySlug: "description",
  definition: "the line printed beside one argument",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty

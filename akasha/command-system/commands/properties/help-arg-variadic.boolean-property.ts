import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type HelpArgVariadic = boolean

export const helpArgVariadic = {
  id: "01a06958-32b7-7cd5-b8cd-d0d2a21e4781",
  pageTypeSlug: "boolean-property",
  slug: "help-arg-variadic",
  propertySlug: "variadic",
  definition: "whether a positional argument takes every remaining word",
} as const satisfies BooleanProperty

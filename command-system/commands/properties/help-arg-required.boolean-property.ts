import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type HelpArgRequired = boolean

export const helpArgRequired = {
  id: "01a06958-32b3-7c8b-b38b-9c5a5d0f4ee1",
  pageTypeSlug: "boolean-property",
  slug: "help-arg-required",
  propertySlug: "required",
  definition: "whether a run without this argument is refused",
} as const satisfies BooleanProperty

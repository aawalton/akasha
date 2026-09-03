import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type HelpArgRepeat = boolean

export const helpArgRepeat = {
  id: "01a06958-32b4-76bb-abf4-34c2a10b0dce",
  pageTypeSlug: "boolean-property",
  slug: "help-arg-repeat",
  propertySlug: "repeat",
  definition: "whether a flag may be given more than once",
} as const satisfies BooleanProperty

import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type HelpArgPath = boolean

export const helpArgPath = {
  id: "01a06958-32b6-77ed-959a-3fba522e451e",
  pageTypeSlug: "boolean-property",
  slug: "help-arg-path",
  propertySlug: "path",
  definition: "whether an argument's value names a file or a folder",
} as const satisfies BooleanProperty

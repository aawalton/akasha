import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type HelpArgStdin = boolean

export const helpArgStdin = {
  id: "01a06958-32b5-73c9-ba5d-1c583721415f",
  pageTypeSlug: "boolean-property",
  slug: "help-arg-stdin",
  propertySlug: "accepts-stdin",
  definition: "whether a flag reads its value from standard input where `-` is given",
} as const satisfies BooleanProperty

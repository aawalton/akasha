import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const liveShell = {
  id: "01a06d9a-4c11-7000-8f2e-5b1d0a7c3e44",
  type: "boolean-property",
  slug: "live-shell",
  propertySlug: "live-shell",
  definition: "whether a command a seat left running in the background has yet to report",
  types: "ts",
} as const satisfies BooleanProperty

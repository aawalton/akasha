import type { FileProperty } from "@akasha/pages/file-property"

export type Rule = "yml"

export const rule = {
  id: "01a08191-fd3c-77e3-81d2-821822ce619e",
  pageTypeSlug: "file-property",
  slug: "rule",
  propertySlug: "rule",
  definition: "what a scanner matches a source file against",
} as const satisfies FileProperty

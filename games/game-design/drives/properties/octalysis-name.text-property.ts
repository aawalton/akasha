import type { TextProperty } from "../../../../pages/text-properties/text-property.page-type.types.ts"

export type OctalysisName = string

export const octalysisName = {
  id: "01a06756-f63f-763c-97cb-c93cfa22c0a7",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "octalysis-name",
  propertySlug: "name",
  definition: "what Chou calls a drive",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty

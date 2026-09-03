import type { TextProperty } from "../../../pages-system/text-properties/text-property.page-type.ts"

export type OctalysisName = string

export const octalysisName = {
  id: "01a06756-f63f-763c-97cb-c93cfa22c0a7",
  pageTypeSlug: "text-property",
  slug: "octalysis-name",
  propertySlug: "name",
  definition: "what Chou calls a drive",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty

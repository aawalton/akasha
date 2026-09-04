import type { TextProperty } from "../../../pages/text-properties/text-property.page-type.ts"

export type OctalysisDefinition = string

export const octalysisDefinition = {
  id: "01a06756-f65a-72fb-a0c1-4ae3bcfb2665",
  pageTypeSlug: "text-property",
  slug: "octalysis-definition",
  propertySlug: "definition",
  definition: "how Chou defines a drive",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty

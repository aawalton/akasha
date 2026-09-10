import type { TextProperty } from "../../../../pages/text-properties/text-property.page-type.types.ts"

export type OctalysisDefinition = string

export const octalysisDefinition = {
  id: "01a06756-f65a-72fb-a0c1-4ae3bcfb2665",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "octalysis-definition",
  propertySlug: "definition",
  definition: "how Chou defines a drive",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty

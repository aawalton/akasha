import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const throwawayProbe = {
  id: "01a0c4fb-4b3a-7e50-93f8-1f77c04489fa",
  type: "page-type/boolean-property",
  slug: "throwaway-probe",
  propertySlug: "throwaway-probe",
  definition: "whether this finding is a throwaway probe",
  types: "ts",
} as const satisfies BooleanProperty

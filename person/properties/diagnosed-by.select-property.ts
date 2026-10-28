import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const diagnosedBy = {
  id: "01a183b0-fc74-7ef2-99fe-65ac4f061852",
  type: "page-type/select-property",
  slug: "diagnosed-by",
  propertySlug: "diagnosed-by",
  definition: "who diagnosed a health condition a person has",
  values: ["self", "clinician"],
  types: "ts",
  createdAt: "2026-10-28T18:06:16.691Z",
  updatedAt: "2026-10-28T18:06:16.691Z",
} as const satisfies SelectProperty

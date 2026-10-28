import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const tobaccoUse = {
  id: "01a183ac-1da4-7ee3-9300-246cd6574d06",
  type: "page-type/select-property",
  slug: "tobacco-use",
  propertySlug: "tobacco-use",
  definition: "whether a person has used tobacco or nicotine",
  values: ["never", "former", "current"],
  types: "ts",
  createdAt: "2026-10-28T18:00:57.507Z",
  updatedAt: "2026-10-28T18:00:57.507Z",
} as const satisfies SelectProperty

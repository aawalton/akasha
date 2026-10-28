import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const icd10Codes = {
  id: "01a183bf-b6a0-7fff-a19d-4d07ff3ad91a",
  type: "page-type/text-property",
  slug: "icd10-codes",
  propertySlug: "icd10-codes",
  definition: "an ICD-10 code a death from a cause is counted under",
  maxLength: 20,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-10-28T18:22:21.854Z",
  updatedAt: "2026-10-28T18:22:21.854Z",
} as const satisfies TextProperty

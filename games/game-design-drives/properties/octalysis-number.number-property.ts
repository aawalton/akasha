import type { NumberProperty } from "../../../pages/number-properties/number-property.page-type.ts"

export type OctalysisNumber = number

export const octalysisNumber = {
  id: "01a06756-f622-7f90-8351-0d7ba794f2cf",
  pageTypeSlug: "number-property",
  slug: "octalysis-number",
  propertySlug: "number",
  definition: "the number Chou gives a drive",
  max: 8,
} as const satisfies NumberProperty

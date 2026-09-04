import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ScannedTo = number

export const scannedTo = {
  id: "01a06c75-5eab-7e36-a02d-115fd081a65e",
  pageTypeSlug: "number-property",
  slug: "scanned-to",
  propertySlug: "scanned-to",
  definition: "the byte of a transcript a reading was taken to",
  max: null,
} as const satisfies NumberProperty

import type { TextProperty } from "@akasha/pages-system/text-property"

export type FinePrint = string

export const finePrint = {
  id: "01a06585-5fc5-7feb-a38e-a2e80bb553df",
  pageTypeSlug: "text-property",
  slug: "fine-print",
  propertySlug: "fine-print",
  definition: "what the offer does not cover",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty

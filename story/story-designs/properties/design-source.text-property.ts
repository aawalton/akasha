import type { TextProperty } from "@akasha/pages-system/text-property"

export type DesignSource = string

export const designSource = {
  id: "01a06577-f385-732c-9db0-af08207d1b0e",
  pageTypeSlug: "text-property",
  slug: "design-source",
  propertySlug: "source",
  definition: "the work a story is drawn from",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty

import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type DesignSource = string

export const designSource = {
  id: "01a06577-f385-732c-9db0-af08207d1b0e",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "design-source",
  propertySlug: "source",
  definition: "the work a story is drawn from",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty

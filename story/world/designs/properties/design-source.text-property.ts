import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const designSource = {
  id: "01a06577-f385-732c-9db0-af08207d1b0e",
  type: "page-type/text-property",
  slug: "design-source",
  propertySlug: "source",
  definition: "a story's source work",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

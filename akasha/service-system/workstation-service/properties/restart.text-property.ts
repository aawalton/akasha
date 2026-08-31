import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Restart = string

export const restart = {
  id: "01a05a3f-b42e-7f07-a396-69c8d83c02cb",
  pageTypeSlug: "text-property",
  slug: "restart",
  propertySlug: "restart",
  definition: "when a unit is started again after it ends",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty

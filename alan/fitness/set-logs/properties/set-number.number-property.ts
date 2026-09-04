import type { NumberProperty } from "@akasha/pages-system/number-property"

export type SetNumber = number

export const setNumber = {
  id: "01a06580-66fd-7ae8-ac42-5007edf1d65b",
  pageTypeSlug: "number-property",
  slug: "set-number",
  propertySlug: "set-number",
  definition: "where the set fell among the sets of that movement that session",
  max: null,
} as const satisfies NumberProperty

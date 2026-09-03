import type { NumberProperty } from "@akasha/pages-system/number-property"

export type NavPlace = number

export const navPlace = {
  id: "01a0680e-5e00-7002-9c37-5b1e8a4d5103",
  pageTypeSlug: "number-property",
  slug: "nav-place",
  propertySlug: "nav-place",
  definition: "where a nav item sits among its siblings",
  max: null,
} as const satisfies NumberProperty

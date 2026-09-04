import type { TextProperty } from "@akasha/pages-system/text-property"

export type NavAppSlug = string

export const navAppSlug = {
  id: "01a0680e-5e00-7000-8a41-6d3c7b9f5101",
  pageTypeSlug: "text-property",
  slug: "nav-app-slug",
  propertySlug: "app-slug",
  definition: "the app a nav item belongs to",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty

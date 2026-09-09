import type { TextProperty } from "@akasha/pages/text-property"

export type NavAppSlug = string

export const navAppSlug = {
  id: "01a0680e-5e00-7000-8a41-6d3c7b9f5101",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "nav-app-slug",
  propertySlug: "app-slug",
  definition: "the app a nav item belongs to",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty

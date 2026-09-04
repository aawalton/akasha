import type { TextProperty } from "@akasha/pages-system/text-property"

export type AlertRoleSlug = string

export const alertRoleSlug = {
  id: "01a06935-977a-7e91-ae12-88623e6a23ba",
  pageTypeSlug: "text-property",
  slug: "alert-role-slug",
  propertySlug: "role-slug",
  definition: "the role an alert is for",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty

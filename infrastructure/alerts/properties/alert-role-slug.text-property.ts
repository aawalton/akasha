import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type AlertRoleSlug = string

export const alertRoleSlug = {
  id: "01a06935-977a-7e91-ae12-88623e6a23ba",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "alert-role-slug",
  propertySlug: "role-slug",
  definition: "the role an alert is for",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty

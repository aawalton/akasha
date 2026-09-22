import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const alertRoleSlug = {
  id: "01a06935-977a-7e91-ae12-88623e6a23ba",
  type: "page-type/text-property",
  slug: "alert-role-slug",
  propertySlug: "role-slug",
  definition: "an alert's role",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty

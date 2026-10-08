import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const validRoles = {
  id: "01a05fcf-90fe-7faf-8ab5-b05131821f7e",
  type: "page-type/text-property",
  slug: "valid-roles",
  propertySlug: "valid-roles",
  definition: "a role a skill suits",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-02T01:50:33.726Z",
  updatedAt: "2026-09-21T15:26:51.000Z",
} as const satisfies TextProperty

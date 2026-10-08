import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const esoWeaponType = {
  id: "01a05fd1-d43b-781e-b83d-8550054c5d2b",
  type: "page-type/text-property",
  slug: "eso-weapon-type",
  propertySlug: "eso-weapon-type",
  definition: "the constant The Elder Scrolls Online names a weapon kind by in its own code",
  maxLength: 200,
  nameFormat: "name-format/upper-snake-case",
  types: "ts",
  createdAt: "2026-09-02T01:53:02.011Z",
  updatedAt: "2026-09-21T15:28:58.000Z",
} as const satisfies TextProperty

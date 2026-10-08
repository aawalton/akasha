import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const maskedUnits = {
  id: "01a0d5a1-8ed0-7173-8152-5fc237fc9cba",
  type: "page-type/text-property",
  slug: "masked-units",
  propertySlug: "masked-units",
  definition: "a systemd unit masked on the machine the page is for",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-24T22:55:30.000Z",
  updatedAt: "2026-09-24T22:55:55.000Z",
} as const satisfies TextProperty

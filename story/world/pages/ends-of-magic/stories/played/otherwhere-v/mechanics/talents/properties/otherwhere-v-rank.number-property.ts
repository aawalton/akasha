import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const otherwhereVRank = {
  id: "01a0ea00-7ced-7120-a71d-aac7062ae23d",
  type: "page-type/number-property",
  slug: "otherwhere-v-rank",
  propertySlug: "rank",
  definition: "the rank a Talent or utility skill in Otherwhere V has reached",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty

import type { ChangeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.types.ts"

export const pagePropertyPropertySlug = {
  id: "01a08194-703b-7387-bedc-4d987dbad775",
  type: "page-type/change-target-subtype",
  slug: "page-property-property-slug",
  definition: "the key a page property's pages use for that property's value",
  changeTargetType: "change-target-type/page-property",
  parent: "change-target-subtype/page-property",
} as const satisfies ChangeTargetSubtype

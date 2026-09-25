import type { ChangeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.types.ts"

export const pagePageProperty = {
  id: "01a0d8d6-1487-733f-92cc-4dae4044ba15",
  type: "page-type/change-target-subtype",
  slug: "page-page-property",
  definition: "a page that is a page property",
  changeTargetType: "change-target-type/page",
  parent: "change-target-subtype/page",
} as const satisfies ChangeTargetSubtype

import type { ChangeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.types.ts"

export const pageTypePage = {
  id: "01a081bc-d955-7288-b41c-a337c7b7f099",
  type: "page-type/change-target-subtype",
  slug: "page-type-page",
  definition: "every page of a page type, taken as a whole page",
  changeTargetType: "change-target-type/page-type",
} as const satisfies ChangeTargetSubtype

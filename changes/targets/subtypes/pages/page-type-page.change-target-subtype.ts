import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.ts"

export const pageTypePage = {
  id: "01a081bc-d955-7288-b41c-a337c7b7f099",
  pageTypeSlug: "change-target-subtype",
  type: "change-target-subtype",
  slug: "page-type-page",
  definition: "every page of one page type, taken as a whole page",
  changeTargetType: "change-target-type/page-type",
} as const satisfies ChangeTargetSubtype

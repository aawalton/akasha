import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.ts"

export const pageTypePageProperty = {
  id: "01a08170-c215-7171-a3a8-647f1e5e0805",
  pageTypeSlug: "change-target-subtype",
  type: "change-target-subtype",
  slug: "page-type-page-property",
  definition: "one property a page type declares, on every page of that page type",
  changeTargetType: "change-target-type/page-type",
} as const satisfies ChangeTargetSubtype

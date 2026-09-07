import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.ts"

export const pageProperty = {
  id: "01a07c7a-29b7-70e3-933c-4a654f8a45e4",
  pageTypeSlug: "change-target-subtype",
  slug: "page-property",
  definition: "a body read as the values a page states",
  changeTargetTypeSlug: "change-target-type/file-content",
} as const satisfies ChangeTargetSubtype

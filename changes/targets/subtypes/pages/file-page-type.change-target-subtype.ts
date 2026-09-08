import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.ts"

export const filePageType = {
  id: "01a07c70-dd0a-7f9c-bc4a-2604e64246d3",
  pageTypeSlug: "change-target-subtype",
  slug: "file-page-type",
  definition: "a file holding a page type",
  changeTargetTypeSlug: "change-target-type/file",
  parentSlug: "change-target-subtype/file-page",
} as const satisfies ChangeTargetSubtype

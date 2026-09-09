import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.ts"

export const filePageType = {
  id: "01a07c70-dd0a-7f9c-bc4a-2604e64246d3",
  pageTypeSlug: "change-target-subtype",
  type: "change-target-subtype",
  slug: "file-page-type",
  definition: "a file with a page type",
  changeTargetType: "change-target-type/file",
  parent: "change-target-subtype/file-page",
} as const satisfies ChangeTargetSubtype

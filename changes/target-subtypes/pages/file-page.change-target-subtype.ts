import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.ts"

export const filePage = {
  id: "01a07c70-bc1d-7011-9766-74cbb066190d",
  pageTypeSlug: "change-target-subtype",
  slug: "file-page",
  definition: "a file holding a page",
  changeTargetTypeSlug: "change-target-type/file",
  parentSlug: "change-target-subtype/file-code",
} as const satisfies ChangeTargetSubtype

import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.ts"

export const fileCode = {
  id: "01a07c70-afc7-75b7-a1aa-9615a67cf8ce",
  pageTypeSlug: "change-target-subtype",
  slug: "file-code",
  definition: "a file holding code",
  changeTargetTypeSlug: "change-target-type/file",
  parentSlug: "change-target-subtype/file",
} as const satisfies ChangeTargetSubtype

import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.types.ts"

export const fileContentPagePropertyKey = {
  id: "01a08194-9e5f-73ac-a6ff-7fcced2faafb",
  pageTypeSlug: "change-target-subtype",
  type: "change-target-subtype",
  slug: "file-content-page-property-key",
  definition: "a body read as the keys a page states its values under",
  changeTargetType: "change-target-type/file-content",
} as const satisfies ChangeTargetSubtype

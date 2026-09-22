import type { ChangeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.types.ts"

export const fileContentPagePropertyKey = {
  id: "01a08194-9e5f-73ac-a6ff-7fcced2faafb",
  type: "page-type/change-target-subtype",
  slug: "file-content-page-property-key",
  definition: "a body taken as the keys a page states its values under",
  changeTargetType: "change-target-type/file-content",
  parent: "change-target-subtype/file-content-page",
} as const satisfies ChangeTargetSubtype

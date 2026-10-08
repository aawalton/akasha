import type { ChangeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.types.ts"

export const filePageType = {
  id: "01a07c70-dd0a-7f9c-bc4a-2604e64246d3",
  type: "page-type/change-target-subtype",
  slug: "file-page-type",
  definition: "a file with a page type",
  changeTargetType: "change-target-type/file",
  parent: "change-target-subtype/file-page",
  createdAt: "2026-09-07T15:16:06.538Z",
  updatedAt: "2026-09-15T16:13:26.000Z",
} as const satisfies ChangeTargetSubtype

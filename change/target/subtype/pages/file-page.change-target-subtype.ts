import type { ChangeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.types.ts"

export const filePage = {
  id: "01a07c70-bc1d-7011-9766-74cbb066190d",
  type: "page-type/change-target-subtype",
  slug: "file-page",
  definition: "a file with a page",
  changeTargetType: "change-target-type/file",
  parent: "change-target-subtype/file-code",
  createdAt: "2026-09-07T15:15:58.109Z",
  updatedAt: "2026-09-15T16:13:26.000Z",
} as const satisfies ChangeTargetSubtype

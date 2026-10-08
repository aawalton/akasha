import type { ChangeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.types.ts"

export const fileContentPage = {
  id: "01a0826a-6400-79ce-a5e5-6dc4c2ad75e8",
  type: "page-type/change-target-subtype",
  slug: "file-content-page",
  definition: "a body taken as a page",
  changeTargetType: "change-target-type/file-content",
  parent: "change-target-subtype/file-content-code",
  createdAt: "2026-09-08T19:06:45.632Z",
  updatedAt: "2026-09-22T13:24:12.000Z",
} as const satisfies ChangeTargetSubtype

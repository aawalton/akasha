import type { ChangeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.types.ts"

export const fileContentPage = {
  id: "01a0826a-6400-79ce-a5e5-6dc4c2ad75e8",
  type: "page-type/change-target-subtype",
  slug: "file-content-page",
  definition: "a body taken as a page",
  changeTargetType: "change-target-type/file-content",
  parent: "change-target-subtype/file-content-code",
} as const satisfies ChangeTargetSubtype

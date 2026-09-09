import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.ts"

export const fileContentPage = {
  id: "01a0826a-6400-79ce-a5e5-6dc4c2ad75e8",
  pageTypeSlug: "change-target-subtype",
  type: "change-target-subtype",
  slug: "file-content-page",
  definition: "a body read as a page",
  changeTargetType: "change-target-type/file-content",
  parent: "change-target-subtype/file-content-code",
} as const satisfies ChangeTargetSubtype

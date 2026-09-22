import type { ChangeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.types.ts"

export const fileContentCode = {
  id: "01a07c7a-1d86-7649-a845-20b1ea1df964",
  type: "page-type/change-target-subtype",
  slug: "file-content-code",
  definition: "a body taken as code",
  changeTargetType: "change-target-type/file-content",
  parent: "change-target-subtype/file-content",
} as const satisfies ChangeTargetSubtype

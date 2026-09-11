import type { ChangeTargetSubtype } from "akasha/changes/targets/subtypes/change-target-subtype.page-type.types.ts"

export const fileContentCode = {
  id: "01a07c7a-1d86-7649-a845-20b1ea1df964",
  type: "change-target-subtype",
  slug: "file-content-code",
  definition: "a body read as code",
  changeTargetType: "change-target-type/file-content",
} as const satisfies ChangeTargetSubtype

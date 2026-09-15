import type { ChangeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.types.ts"

export const fileContent = {
  id: "01a09b5c-90b8-7ae3-9d74-2b9ba7ed1260",
  type: "page-type/change-target-subtype",
  slug: "file-content",
  definition: "a body, whatever that body holds",
  changeTargetType: "change-target-type/file-content",
} as const satisfies ChangeTargetSubtype

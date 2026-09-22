import type { ChangeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.types.ts"

export const fileContentEntryKey = {
  id: "01a09b5c-a94c-7b54-98ae-46591f50d4cb",
  type: "page-type/change-target-subtype",
  slug: "file-content-entry-key",
  definition: "a body taken as the keys of an entry beside a page",
  changeTargetType: "change-target-type/file-content",
  parent: "change-target-subtype/file-content",
} as const satisfies ChangeTargetSubtype

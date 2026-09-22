import type { ChangeTargetSubtype } from "akasha/change/target/subtype/change-target-subtype.page-type.types.ts"

export const fileContentManifest = {
  id: "01a07c7a-427b-7571-9ad2-19341455abcb",
  type: "page-type/change-target-subtype",
  slug: "file-content-manifest",
  definition: "a body taken as the ways a package manifest declares",
  changeTargetType: "change-target-type/file-content",
  parent: "change-target-subtype/file-content",
} as const satisfies ChangeTargetSubtype

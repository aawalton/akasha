import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.ts"

export const fileContentManifest = {
  id: "01a07c7a-427b-7571-9ad2-19341455abcb",
  pageTypeSlug: "change-target-subtype",
  type: "change-target-subtype",
  slug: "file-content-manifest",
  definition: "a body read as the ways a package manifest declares",
  changeTargetType: "change-target-type/file-content",
} as const satisfies ChangeTargetSubtype

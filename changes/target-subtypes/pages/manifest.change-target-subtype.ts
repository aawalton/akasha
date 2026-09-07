import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.ts"

export const manifest = {
  id: "01a07c7a-427b-7571-9ad2-19341455abcb",
  pageTypeSlug: "change-target-subtype",
  slug: "manifest",
  definition: "a body read as the ways a package manifest declares",
  changeTargetTypeSlug: "change-target-type/file-content",
} as const satisfies ChangeTargetSubtype

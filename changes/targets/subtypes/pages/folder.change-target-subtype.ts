import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.types.ts"

export const folder = {
  id: "01a07c7a-63e5-7531-b2d1-7c587299f685",
  pageTypeSlug: "change-target-subtype",
  type: "change-target-subtype",
  slug: "folder",
  definition: "any folder, whatever that folder has",
  changeTargetType: "change-target-type/folder",
} as const satisfies ChangeTargetSubtype

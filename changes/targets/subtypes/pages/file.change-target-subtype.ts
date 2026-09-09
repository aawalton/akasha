import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.ts"

export const file = {
  id: "01a07c70-a373-7d0b-b347-5000e312f47e",
  pageTypeSlug: "change-target-subtype",
  type: "change-target-subtype",
  slug: "file",
  definition: "any file, whatever that file has",
  changeTargetType: "change-target-type/file",
} as const satisfies ChangeTargetSubtype

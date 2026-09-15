import type { ChangeTargetType } from "akasha/change/target/type/change-target-type.page-type.types.ts"

export const pageType = {
  id: "01a08170-abe8-7f8c-bcb4-88ffb2372c97",
  type: "page-type/change-target-type",
  slug: "page-type",
  definition: "a page type, and through it every page of that page type",
} as const satisfies ChangeTargetType

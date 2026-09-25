import type { ChangeTargetType } from "akasha/change/target/type/change-target-type.page-type.types.ts"

export const page = {
  id: "01a0d8d6-1488-79dc-a4c6-c3238f7ef7fa",
  type: "page-type/change-target-type",
  slug: "page",
  definition: "a page, taken as the thing named rather than the file that page sits in",
} as const satisfies ChangeTargetType

import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerHealth = {
  id: "01a0c9d4-9bff-7a43-87a6-fc93e4246d38",
  type: "page-type/page-type",
  slug: "tower-health",
  definition: "the life a character in the Tower has left",
  extends: ["page-type/resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

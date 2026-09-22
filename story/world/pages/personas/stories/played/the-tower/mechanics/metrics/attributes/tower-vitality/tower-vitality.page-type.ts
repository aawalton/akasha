import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerVitality = {
  id: "01a0c9f7-f79f-742c-9dd7-88f6a43f93f5",
  type: "page-type/page-type",
  slug: "tower-vitality",
  definition: "how much a character in the Tower endures",
  extends: ["page-type/tower-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

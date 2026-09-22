import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerWill = {
  id: "01a0c9f8-25ca-73ff-9748-427d547e9ab1",
  type: "page-type/page-type",
  slug: "tower-will",
  definition: "how firmly a character in the Tower holds a purpose",
  extends: ["page-type/character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

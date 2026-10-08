import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerVitality = {
  id: "01a0c9f7-f79f-742c-9dd7-88f6a43f93f5",
  type: "page-type/page-type",
  slug: "tower-vitality",
  definition: "how much a character in the Tower endures",
  extends: ["page-type/tower-attribute"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T16:34:26.335Z",
  updatedAt: "2026-09-22T17:26:24.000Z",
} as const satisfies PageType

import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerWill = {
  id: "01a0c9f8-25ca-73ff-9748-427d547e9ab1",
  type: "page-type/page-type",
  slug: "tower-will",
  definition: "how firmly a character in the Tower holds a purpose",
  extends: ["page-type/tower-attribute"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T16:34:38.154Z",
  updatedAt: "2026-09-22T17:26:24.000Z",
} as const satisfies PageType

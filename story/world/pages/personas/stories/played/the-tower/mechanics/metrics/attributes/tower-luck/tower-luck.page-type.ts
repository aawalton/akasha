import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerLuck = {
  id: "01a0c9f8-452d-7de5-835a-96d69661cb13",
  type: "page-type/page-type",
  slug: "tower-luck",
  definition: "how far chance favours a character in the Tower",
  extends: ["page-type/tower-attribute"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T16:34:46.189Z",
  updatedAt: "2026-09-22T17:26:24.000Z",
} as const satisfies PageType

import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerHealth = {
  id: "01a0c9d4-9bff-7a43-87a6-fc93e4246d38",
  type: "page-type/page-type",
  slug: "tower-health",
  definition: "the health a character in the Tower has left",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T15:55:49.119Z",
  updatedAt: "2026-09-24T17:39:26.000Z",
} as const satisfies PageType

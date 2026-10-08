import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerFinesse = {
  id: "01a0c9f7-e86e-7225-9d40-1dfc8c0359db",
  type: "page-type/page-type",
  slug: "tower-finesse",
  definition: "how precisely a character in the Tower moves",
  extends: ["page-type/tower-attribute"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T16:34:22.446Z",
  updatedAt: "2026-09-22T17:26:24.000Z",
} as const satisfies PageType

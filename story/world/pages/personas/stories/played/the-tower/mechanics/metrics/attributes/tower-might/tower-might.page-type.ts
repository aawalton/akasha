import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerMight = {
  id: "01a0c9f7-d963-7f53-8012-54fb59cc1f57",
  type: "page-type/page-type",
  slug: "tower-might",
  definition: "how hard a character in the Tower hits",
  extends: ["page-type/tower-attribute"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T16:34:18.595Z",
  updatedAt: "2026-09-22T17:26:24.000Z",
} as const satisfies PageType

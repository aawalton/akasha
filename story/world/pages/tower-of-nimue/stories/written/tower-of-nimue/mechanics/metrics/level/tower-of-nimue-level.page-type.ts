import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerOfNimueLevel = {
  id: "01a0dee9-5494-7564-ab27-80bb2b1ac27b",
  type: "page-type/page-type",
  slug: "tower-of-nimue-level",
  definition:
    "how many levels a climber in the Tower of Nimue has, one more than the floors cleared",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-26T18:10:28.628Z",
  updatedAt: "2026-09-26T18:10:35.000Z",
} as const satisfies PageType

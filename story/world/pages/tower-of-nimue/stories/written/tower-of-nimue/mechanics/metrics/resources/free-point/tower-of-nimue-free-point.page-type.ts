import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerOfNimueFreePoint = {
  id: "01a0dee9-5494-72a2-b31f-364e94ffde5d",
  type: "page-type/page-type",
  slug: "tower-of-nimue-free-point",
  definition: "a point a climber in the Tower of Nimue has banked to raise a stat with",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-26T18:10:28.628Z",
  updatedAt: "2026-09-26T18:10:35.000Z",
} as const satisfies PageType

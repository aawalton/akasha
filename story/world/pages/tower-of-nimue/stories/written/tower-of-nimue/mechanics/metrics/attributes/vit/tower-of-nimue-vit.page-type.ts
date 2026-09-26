import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerOfNimueVit = {
  id: "01a0dee9-5494-7af6-b1f1-d69d1cb46d36",
  type: "page-type/page-type",
  slug: "tower-of-nimue-vit",
  definition: "how well a climber in the Tower of Nimue survives",
  extends: ["page-type/tower-of-nimue-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

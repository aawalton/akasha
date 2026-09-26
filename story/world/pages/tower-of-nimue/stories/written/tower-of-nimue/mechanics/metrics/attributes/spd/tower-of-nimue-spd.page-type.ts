import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerOfNimueSpd = {
  id: "01a0dee9-5494-79a9-baf2-fe035e9048fa",
  type: "page-type/page-type",
  slug: "tower-of-nimue-spd",
  definition: "how quickly a climber in the Tower of Nimue acts and evades",
  extends: ["page-type/tower-of-nimue-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

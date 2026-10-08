import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerOfNimueAtt = {
  id: "01a0dee9-5492-7aba-95ba-1c556309ffa7",
  type: "page-type/page-type",
  slug: "tower-of-nimue-att",
  definition: "how well a climber in the Tower of Nimue takes in and wields essences",
  extends: ["page-type/tower-of-nimue-attribute"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-26T18:10:28.626Z",
  updatedAt: "2026-09-26T18:10:35.000Z",
} as const satisfies PageType

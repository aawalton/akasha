import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerOfNimueIns = {
  id: "01a0dee9-5493-7f49-8e4b-9103890940bd",
  type: "page-type/page-type",
  slug: "tower-of-nimue-ins",
  definition: "how much a climber in the Tower of Nimue perceives",
  extends: ["page-type/tower-of-nimue-attribute"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-26T18:10:28.627Z",
  updatedAt: "2026-09-26T18:10:35.000Z",
} as const satisfies PageType

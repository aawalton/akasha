import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const cornerstoneSight = {
  id: "01a0dee4-467c-7b6b-a861-398c5feb6817",
  type: "page-type/page-type",
  slug: "cornerstone-sight",
  definition: "the Depth of the Waking Stone's perception beyond its soil",
  extends: ["page-type/cornerstone-faculty"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-26T18:04:57.340Z",
  updatedAt: "2026-09-26T18:05:05.000Z",
} as const satisfies PageType

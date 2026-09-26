import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const cornerstoneReach = {
  id: "01a0dee4-467c-7a9e-999a-c95f2b32f622",
  type: "page-type/page-type",
  slug: "cornerstone-reach",
  definition: "the Depth of the Waking Stone's extent through its bound land",
  extends: ["page-type/cornerstone-faculty"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

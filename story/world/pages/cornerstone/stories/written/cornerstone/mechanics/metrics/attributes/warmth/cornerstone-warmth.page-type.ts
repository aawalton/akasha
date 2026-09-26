import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const cornerstoneWarmth = {
  id: "01a0dee4-467c-7eea-a770-9238dff257c6",
  type: "page-type/page-type",
  slug: "cornerstone-warmth",
  definition: "the Depth of the Waking Stone's sense of the inner state of its people",
  extends: ["page-type/cornerstone-faculty"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

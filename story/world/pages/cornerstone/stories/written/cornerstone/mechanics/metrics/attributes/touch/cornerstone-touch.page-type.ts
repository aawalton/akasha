import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const cornerstoneTouch = {
  id: "01a0dee4-467c-75dc-bef6-e70bf476ba7b",
  type: "page-type/page-type",
  slug: "cornerstone-touch",
  definition: "the Depth of the Waking Stone's innate sense of direct contact with its bound soil",
  extends: ["page-type/cornerstone-faculty"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

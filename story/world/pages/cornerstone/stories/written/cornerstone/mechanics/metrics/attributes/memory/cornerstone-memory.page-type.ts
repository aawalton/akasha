import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const cornerstoneMemory = {
  id: "01a0dee4-467c-7755-9256-dafd686ada7a",
  type: "page-type/page-type",
  slug: "cornerstone-memory",
  definition: "the Depth of the Waking Stone's own continuity across time",
  extends: ["page-type/cornerstone-faculty"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

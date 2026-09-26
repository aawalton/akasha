import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const cornerstoneProvision = {
  id: "01a0dee4-467c-778f-81dc-a26e925c46a6",
  type: "page-type/page-type",
  slug: "cornerstone-provision",
  definition: "the Depth of the Waking Stone's sense of resources and scarcity",
  extends: ["page-type/cornerstone-faculty"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

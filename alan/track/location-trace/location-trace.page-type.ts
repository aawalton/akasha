import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const locationTrace = {
  id: "01a06836-795a-76ec-95fa-2b57e5a7dc38",
  type: "page-type/page-type",
  slug: "location-trace",
  definition: "where Alan's phone put him at one moment",
  extends: ["page-type/page"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldReputation = {
  id: "01a06558-a991-7177-b114-17a075e47791",
  type: "page-type/page-type",
  slug: "world-reputation",
  definition: "how a people stand toward a character",
  pluralSlug: "reputations",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

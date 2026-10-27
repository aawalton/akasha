import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldReputation = {
  id: "01a06558-a991-7177-b114-17a075e47791",
  type: "page-type/page-type",
  slug: "world-reputation",
  definition: "how a people stand toward a character",
  pluralSlug: "reputations",
  extends: ["page-type/world-mechanic"],
  parts: [],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T03:38:24.529Z",
  updatedAt: "2026-10-27T19:50:20.465Z",
} as const satisfies PageType

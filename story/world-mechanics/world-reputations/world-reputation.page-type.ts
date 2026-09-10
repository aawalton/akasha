import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const worldReputation = {
  id: "01a06558-a991-7177-b114-17a075e47791",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-reputation",
  definition: "how a people stand toward a character",
  pluralSlug: "world-reputations",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
} as const satisfies PageType

import type { PageType } from "@akasha/pages-system/page-type"
import type { WorldMechanic } from "../world-mechanic.page-type.ts"

export type WorldReputation = WorldMechanic

export const worldReputation = {
  id: "01a06558-a991-7177-b114-17a075e47791",
  pageTypeSlug: "page-type",
  slug: "world-reputation",
  definition: "how a people stand toward a character",
  pluralSlug: "world-reputations",
  extendsSlug: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType

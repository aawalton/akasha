import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerAttunementRank = {
  id: "01a0ca71-8eb9-7776-9deb-b2f7ca5365a1",
  type: "page-type/page-type",
  slug: "tower-attunement-rank",
  definition: "a rung on the Tower's ladder of control over an element",
  pluralSlug: "ranks",
  extends: ["page-type/attunement-rank"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

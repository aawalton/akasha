import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveStudyAid = {
  id: "01a0e9f8-6bb4-71a6-8ddb-1b7b918ea897",
  type: "page-type/world-item",
  slug: "super-supportive-study-aid",
  title: "study aid",
  world: "world/super-supportive",
  aliases: ["clay spiral earring"],
  description: "A thin mauve spiral earring that makes study inescapably interesting.",
} as const satisfies WorldItem

import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const temptress = {
  id: "01a06586-0a65-7e99-ab39-cab43b38dc66",
  type: "page-type/world-class",
  slug: "temptress",
  title: "Temptress",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass

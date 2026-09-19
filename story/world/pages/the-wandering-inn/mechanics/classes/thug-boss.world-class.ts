import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const thugBoss = {
  id: "01a0657e-026b-77a9-9077-dd6c0c24e00c",
  type: "page-type/world-class",
  slug: "thug-boss",
  title: "Thug Boss",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass

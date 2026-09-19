import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warBards = {
  id: "01a0657e-026f-76f4-bc2b-56393dbb43d1",
  type: "page-type/world-class",
  slug: "war-bards",
  title: "War Bards",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass

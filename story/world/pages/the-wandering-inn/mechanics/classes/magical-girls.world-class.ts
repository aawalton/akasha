import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magicalGirls = {
  id: "01a0657e-139b-7db1-9870-d3ef78ad8001",
  type: "page-type/world-class",
  slug: "magical-girls",
  title: "Magical Girls",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass

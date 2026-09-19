import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magicalWeaver = {
  id: "01a0657e-139b-71ac-ad1c-6865b2a97233",
  type: "page-type/world-class",
  slug: "magical-weaver",
  title: "Magical Weaver",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass

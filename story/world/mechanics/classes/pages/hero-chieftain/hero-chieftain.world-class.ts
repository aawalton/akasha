import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const heroChieftain = {
  id: "01a0657e-1373-7811-9a27-f22b9ed29d31",
  type: "page-type/world-class",
  slug: "hero-chieftain",
  title: "Hero Chieftain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass

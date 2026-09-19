import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const greatChieftain = {
  id: "01a0657e-136e-7493-8a07-02b40bbcd93e",
  type: "page-type/world-class",
  slug: "great-chieftain",
  title: "Great Chieftain",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["goblin-lord-solstice-rags-of-change"],
  references: "jsonl",
} as const satisfies WorldClass

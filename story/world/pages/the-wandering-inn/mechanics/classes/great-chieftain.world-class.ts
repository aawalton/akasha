import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const greatChieftain = {
  id: "01a0657e-136e-7493-8a07-02b40bbcd93e",
  type: "page-type/world-class",
  slug: "great-chieftain",
  title: "Great Chieftain",
  world: "world/the-wandering-inn",
  appearanceCount: 24,
  evolvesToSlugs: ["world-class/goblin-lord-solstice-rags-of-change"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.462Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass

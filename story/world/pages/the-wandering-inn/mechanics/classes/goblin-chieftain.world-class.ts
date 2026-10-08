import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const goblinChieftain = {
  id: "01a0657e-136c-7580-90cf-630687904d94",
  type: "page-type/world-class",
  slug: "goblin-chieftain",
  title: "Goblin Chieftain",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-class/chieftain-of-the-maw"],
  createdAt: "2026-09-03T04:19:16.460Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass

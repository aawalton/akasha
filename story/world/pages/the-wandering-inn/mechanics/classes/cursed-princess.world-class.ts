import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cursedPrincess = {
  id: "01a0657e-1351-71a2-b45e-38b2375c3558",
  type: "page-type/world-class",
  slug: "cursed-princess",
  title: "Cursed Princess",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/deathtouch-princess"],
  evolvesToSlugs: ["world-class/curse-bearer-princess"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.433Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass

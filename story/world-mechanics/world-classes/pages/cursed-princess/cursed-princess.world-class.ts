import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const cursedPrincess = {
  id: "01a0657e-1351-71a2-b45e-38b2375c3558",
  type: "world-class",
  slug: "cursed-princess",
  title: "Cursed Princess",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["deathtouch-princess"],
  evolvesToSlugs: ["curse-bearer-princess"],
  references: "jsonl",
} as const satisfies WorldClass

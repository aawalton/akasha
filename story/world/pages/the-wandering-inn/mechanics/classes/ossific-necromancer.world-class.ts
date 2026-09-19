import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const ossificNecromancer = {
  id: "01a0657e-0235-7adf-8500-1df13c2e0442",
  type: "page-type/world-class",
  slug: "ossific-necromancer",
  title: "Ossific Necromancer",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["necromancer"],
  evolvesToSlugs: ["deathbane-necromancer"],
  references: "jsonl",
} as const satisfies WorldClass

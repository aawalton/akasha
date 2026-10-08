import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const ossificNecromancer = {
  id: "01a0657e-0235-7adf-8500-1df13c2e0442",
  type: "page-type/world-class",
  slug: "ossific-necromancer",
  title: "Ossific Necromancer",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/necromancer"],
  evolvesToSlugs: ["world-class/deathbane-necromancer"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.053Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass

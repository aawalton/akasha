import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const necromancerOfReclaimedGrandeur = {
  id: "01a0657e-13a3-7ee8-9d48-47298b7dccc0",
  type: "page-type/world-class",
  slug: "necromancer-of-reclaimed-grandeur",
  title: "Necromancer of Reclaimed Grandeur",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  evolvesFromSlugs: ["world-class/deathbane-necromancer"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.515Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass

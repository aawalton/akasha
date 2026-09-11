import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const necromancerOfReclaimedGrandeur = {
  id: "01a0657e-13a3-7ee8-9d48-47298b7dccc0",
  type: "world-class",
  slug: "necromancer-of-reclaimed-grandeur",
  title: "Necromancer of Reclaimed Grandeur",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["deathbane-necromancer"],
  references: "jsonl",
} as const satisfies WorldClass

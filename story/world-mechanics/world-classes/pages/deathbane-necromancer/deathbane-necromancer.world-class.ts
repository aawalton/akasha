import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const deathbaneNecromancer = {
  id: "01a0657e-01cf-72c1-bf7c-218f52f85227",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "deathbane-necromancer",
  title: "Deathbane Necromancer",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["ossific-necromancer"],
  evolvesToSlugs: ["necromancer-of-reclaimed-grandeur"],
  references: "jsonl",
} as const satisfies WorldClass

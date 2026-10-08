import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const deathbaneNecromancer = {
  id: "01a0657e-01cf-72c1-bf7c-218f52f85227",
  type: "page-type/world-class",
  slug: "deathbane-necromancer",
  title: "Deathbane Necromancer",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  evolvesFromSlugs: ["world-class/ossific-necromancer"],
  evolvesToSlugs: ["world-class/necromancer-of-reclaimed-grandeur"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.951Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass

import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const crusader = {
  id: "01a0657e-1350-707d-b761-3bcf4bd942cf",
  type: "page-type/world-class",
  slug: "crusader",
  title: "Crusader",
  world: "world/the-wandering-inn",
  appearanceCount: 25,
  aliases: ["CruSAdeR", "crusaders"],
  evolvesToSlugs: ["world-class/templar"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.432Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass

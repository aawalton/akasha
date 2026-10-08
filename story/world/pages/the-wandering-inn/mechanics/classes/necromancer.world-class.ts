import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const necromancer = {
  id: "01a0657e-13ab-71e9-83ba-542d4f1b5479",
  type: "page-type/world-class",
  slug: "necromancer",
  title: "Necromancer",
  world: "world/the-wandering-inn",
  appearanceCount: 338,
  aliases: ["necromancers"],
  evolvesToSlugs: ["world-class/ossific-necromancer"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.523Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass

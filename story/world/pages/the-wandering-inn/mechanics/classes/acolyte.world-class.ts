import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const acolyte = {
  id: "01a0657e-1324-78c5-9fad-64f4d6603ed4",
  type: "page-type/world-class",
  slug: "acolyte",
  title: "Acolyte",
  world: "world/the-wandering-inn",
  appearanceCount: 26,
  aliases: ["acolytes"],
  evolvesToSlugs: ["world-class/cleric"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.388Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass

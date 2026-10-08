import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const silversteelArmsmistress = {
  id: "01a0657e-0255-72e0-a755-91133732cb4a",
  type: "page-type/world-class",
  slug: "silversteel-armsmistress",
  title: "Silversteel Armsmistress",
  world: "world/the-wandering-inn",
  appearanceCount: 31,
  evolvesFromSlugs: ["world-class/wounded-warrior"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.085Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass

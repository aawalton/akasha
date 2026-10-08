import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mage = {
  id: "01a0657e-0229-758f-aed9-d8cb28e4f932",
  type: "page-type/world-class",
  slug: "mage",
  title: "Mage",
  world: "world/the-wandering-inn",
  appearanceCount: 565,
  aliases: ["mages"],
  evolvesToSlugs: ["world-class/druid"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.041Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass

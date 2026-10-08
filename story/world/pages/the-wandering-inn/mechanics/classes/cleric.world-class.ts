import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cleric = {
  id: "01a0657e-134a-7e0e-8ed4-6c5db4137b49",
  type: "page-type/world-class",
  slug: "cleric",
  title: "Cleric",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  aliases: ["clerics"],
  evolvesFromSlugs: ["world-class/acolyte"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.426Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass

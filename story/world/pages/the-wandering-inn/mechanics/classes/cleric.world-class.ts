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
} as const satisfies WorldClass

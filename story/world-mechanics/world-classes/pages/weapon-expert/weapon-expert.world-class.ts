import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const weaponExpert = {
  id: "01a0657e-0271-7d56-b61a-5901631f9287",
  type: "world-class",
  slug: "weapon-expert",
  title: "Weapon Expert",
  world: "the-wandering-inn",
  aliases: ["weapon-experts"],
  evolvesFromSlugs: ["warrior"],
  references: "jsonl",
} as const satisfies WorldClass

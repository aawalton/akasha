import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const weaponExpert = {
  id: "01a0657e-0271-7d56-b61a-5901631f9287",
  type: "page-type/world-class",
  slug: "weapon-expert",
  title: "Weapon Expert",
  world: "world/the-wandering-inn",
  appearanceCount: 9,
  aliases: ["weapon-experts"],
  evolvesFromSlugs: ["world-class/warrior"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.113Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass

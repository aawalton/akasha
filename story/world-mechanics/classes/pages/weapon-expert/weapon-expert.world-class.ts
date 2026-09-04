import type { WorldClass } from "../../world-class.page-type.ts"

export const weaponExpert = {
  id: "01a0657e-0271-7d56-b61a-5901631f9287",
  pageTypeSlug: "world-class",
  slug: "weapon-expert",
  title: "Weapon Expert",
  worldSlug: "the-wandering-inn",
  aliases: ["weapon-experts"],
  evolvesFromSlugs: ["warrior"],
  references: "jsonl",
} as const satisfies WorldClass

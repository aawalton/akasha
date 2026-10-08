import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const barmaid = {
  id: "01a0657e-01b2-7c35-a112-50468414b47e",
  type: "page-type/world-class",
  slug: "barmaid",
  title: "Barmaid",
  world: "world/the-wandering-inn",
  appearanceCount: 110,
  aliases: ["barmaids"],
  evolvesToSlugs: ["world-class/boxhead-barmaid"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.922Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass

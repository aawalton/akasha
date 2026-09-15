import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const barmaid = {
  id: "01a0657e-01b2-7c35-a112-50468414b47e",
  type: "world-class",
  slug: "barmaid",
  title: "Barmaid",
  world: "world/the-wandering-inn",
  aliases: ["barmaids"],
  evolvesToSlugs: ["boxhead-barmaid"],
  references: "jsonl",
} as const satisfies WorldClass

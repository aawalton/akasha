import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const awesomeInnkeeper = {
  id: "01a0657e-1336-7515-87f5-d8b5c8c77b50",
  type: "page-type/world-class",
  slug: "awesome-innkeeper",
  title: "Awesome Innkeeper",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["innkeeper"],
  references: "jsonl",
} as const satisfies WorldClass

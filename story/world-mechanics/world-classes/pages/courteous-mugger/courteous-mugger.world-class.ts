import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const courteousMugger = {
  id: "01a0657e-01cb-7d64-b467-5a12f9cb582e",
  type: "world-class",
  slug: "courteous-mugger",
  title: "Courteous Mugger",
  world: "the-wandering-inn",
  evolvesToSlugs: ["courteous-knight"],
  references: "jsonl",
} as const satisfies WorldClass

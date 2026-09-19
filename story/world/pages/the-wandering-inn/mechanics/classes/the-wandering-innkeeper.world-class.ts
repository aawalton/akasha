import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const theWanderingInnkeeper = {
  id: "01a06586-0a65-702e-8199-a14728ad961a",
  type: "page-type/world-class",
  slug: "the-wandering-innkeeper",
  title: "The Wandering Innkeeper",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["magical-innkeeper"],
  references: "jsonl",
} as const satisfies WorldClass

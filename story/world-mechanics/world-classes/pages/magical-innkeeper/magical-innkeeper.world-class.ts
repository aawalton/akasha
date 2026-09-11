import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const magicalInnkeeper = {
  id: "01a0657e-022b-7d28-8e32-fa635a33232b",
  type: "world-class",
  slug: "magical-innkeeper",
  title: "Magical Innkeeper",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["innkeeper"],
  evolvesToSlugs: ["the-wandering-innkeeper"],
  references: "jsonl",
} as const satisfies WorldClass

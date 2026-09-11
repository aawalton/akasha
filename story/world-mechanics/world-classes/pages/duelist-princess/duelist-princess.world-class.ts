import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const duelistPrincess = {
  id: "01a0657e-01d5-7bd2-8b58-ea86d1b3356c",
  type: "world-class",
  slug: "duelist-princess",
  title: "Duelist Princess",
  world: "the-wandering-inn",
  evolvesToSlugs: ["queen-temporary"],
  references: "jsonl",
} as const satisfies WorldClass

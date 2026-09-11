import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const curseBearerPrincess = {
  id: "01a0657e-01ce-7395-a20a-a75f43aee647",
  type: "world-class",
  slug: "curse-bearer-princess",
  title: "Curse Bearer Princess",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["cursed-princess"],
  references: "jsonl",
} as const satisfies WorldClass

import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const viceInnkeeperOfSpells = {
  id: "01a06586-0a6f-7d47-8688-6f29f8736e29",
  type: "world-class",
  slug: "vice-innkeeper-of-spells",
  title: "Vice Innkeeper of Spells",
  world: "the-wandering-inn",
  evolvesToSlugs: ["innkeeper-of-the-magical-frontier"],
  references: "jsonl",
} as const satisfies WorldClass

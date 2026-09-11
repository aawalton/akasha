import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const mercenary = {
  id: "01a0657e-13a0-757c-a347-97f1f26d72f8",
  type: "world-class",
  slug: "mercenary",
  title: "Mercenary",
  world: "the-wandering-inn",
  evolvesToSlugs: ["company-commander"],
  references: "jsonl",
} as const satisfies WorldClass

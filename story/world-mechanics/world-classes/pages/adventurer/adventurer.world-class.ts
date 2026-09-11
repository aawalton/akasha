import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const adventurer = {
  id: "01a0657e-01a5-7594-ba0c-18a5f41f1f07",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "adventurer",
  title: "Adventurer",
  world: "the-wandering-inn",
  aliases: ["adventurers"],
  evolvesToSlugs: ["horrorbane-adventurer"],
  references: "jsonl",
} as const satisfies WorldClass

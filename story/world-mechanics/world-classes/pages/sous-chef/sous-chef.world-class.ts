import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const sousChef = {
  id: "01a0657e-025d-7e76-9092-e6ce79ca539e",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "sous-chef",
  title: "Sous Chef",
  world: "the-wandering-inn",
  aliases: ["Sous-chef"],
  references: "jsonl",
} as const satisfies WorldClass

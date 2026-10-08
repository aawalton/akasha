import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sousChef = {
  id: "01a0657e-025d-7e76-9092-e6ce79ca539e",
  type: "page-type/world-class",
  slug: "sous-chef",
  title: "Sous Chef",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  aliases: ["Sous-chef"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.093Z",
  updatedAt: "2026-09-22T13:30:07.000Z",
} as const satisfies WorldClass

import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const storyteller = {
  id: "01a0657e-0260-746d-8475-7d95022d1957",
  type: "page-type/world-class",
  slug: "storyteller",
  title: "Storyteller",
  world: "world/the-wandering-inn",
  appearanceCount: 18,
  aliases: ["storytellers"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.096Z",
  updatedAt: "2026-09-22T13:30:14.000Z",
} as const satisfies WorldClass

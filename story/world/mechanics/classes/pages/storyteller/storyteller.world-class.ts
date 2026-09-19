import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const storyteller = {
  id: "01a0657e-0260-746d-8475-7d95022d1957",
  type: "page-type/world-class",
  slug: "storyteller",
  title: "Storyteller",
  world: "world/the-wandering-inn",
  aliases: ["storytellers"],
  references: "jsonl",
} as const satisfies WorldClass

import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const storyteller = {
  id: "01a0657e-0260-746d-8475-7d95022d1957",
  type: "world-class",
  slug: "storyteller",
  title: "Storyteller",
  world: "the-wandering-inn",
  aliases: ["storytellers"],
  references: "jsonl",
} as const satisfies WorldClass

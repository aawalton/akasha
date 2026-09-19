import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const buscrei = {
  id: "01a0b707-8b68-7eef-8e38-f46cab018ea7",
  type: "page-type/world-character",
  slug: "buscrei",
  title: "Buscrei",
  world: "world/the-wandering-inn",
  firstChapter: 568,
  lastChapter: 568,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

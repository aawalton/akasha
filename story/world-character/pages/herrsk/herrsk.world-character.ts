import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const herrsk = {
  id: "01a0b70a-f9b4-7aa5-b1e4-fd883f0dc03d",
  type: "page-type/world-character",
  slug: "herrsk",
  title: "Herrsk",
  world: "world/the-wandering-inn",
  firstChapter: 381,
  lastChapter: 381,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

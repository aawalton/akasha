import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const silmak = {
  id: "01a0b70d-0085-7214-a192-3be3ec5f4c10",
  type: "page-type/world-character",
  slug: "silmak",
  title: "Silmak",
  world: "world/the-wandering-inn",
  firstChapter: 324,
  lastChapter: 324,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

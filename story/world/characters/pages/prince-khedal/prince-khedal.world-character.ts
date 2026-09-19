import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const princeKhedal = {
  id: "01a0b70c-73e9-7f37-9f6f-7c894b8abce1",
  type: "page-type/world-character",
  slug: "prince-khedal",
  title: "Prince Khedal",
  world: "world/the-wandering-inn",
  firstChapter: 418,
  lastChapter: 418,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const teresAtwood = {
  id: "01a0b70d-1774-7879-8c11-5c59978a339a",
  type: "page-type/world-character",
  slug: "teres-atwood",
  title: "Teres Atwood",
  world: "world/the-wandering-inn",
  firstChapter: 323,
  lastChapter: 513,
  characterClaims: "jsonl",
  aliasOf: "world-character/teresa-atwood",
} as const satisfies WorldCharacter

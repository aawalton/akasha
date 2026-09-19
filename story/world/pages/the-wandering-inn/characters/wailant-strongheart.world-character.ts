import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const wailantStrongheart = {
  id: "01a0b70d-98a0-788a-989f-ccc24e1b045e",
  type: "page-type/world-character",
  slug: "wailant-strongheart",
  title: "Wailant Strongheart",
  world: "world/the-wandering-inn",
  firstChapter: 194,
  lastChapter: 401,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

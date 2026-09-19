import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const wailant = {
  id: "01a0b70d-9867-7164-88ea-a298d95c06c2",
  type: "page-type/world-character",
  slug: "wailant",
  title: "Wailant",
  world: "world/the-wandering-inn",
  firstChapter: 405,
  lastChapter: 408,
  characterClaims: "jsonl",
  aliasOf: "world-character/wailant-strongheart",
} as const satisfies WorldCharacter

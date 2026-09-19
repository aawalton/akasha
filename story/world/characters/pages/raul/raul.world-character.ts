import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const raul = {
  id: "01a0b70c-87e3-7796-80d0-ce14141e95d4",
  type: "page-type/world-character",
  slug: "raul",
  title: "Raul",
  world: "world/the-wandering-inn",
  firstChapter: 445,
  lastChapter: 445,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const beatrice = {
  id: "01a0b707-7e99-749c-bbc6-5bf0d82c6e66",
  type: "page-type/world-character",
  slug: "beatrice",
  title: "Beatrice",
  world: "world/the-wandering-inn",
  firstChapter: 158,
  lastChapter: 275,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

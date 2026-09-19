import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const melika = {
  id: "01a0b70b-e505-7995-8947-590b363339d5",
  type: "page-type/world-character",
  slug: "melika",
  title: "Melika",
  world: "world/the-wandering-inn",
  firstChapter: 783,
  lastChapter: 783,
  characterClaims: "jsonl",
  aliasOf: "world-character/melika-blackwing",
} as const satisfies WorldCharacter

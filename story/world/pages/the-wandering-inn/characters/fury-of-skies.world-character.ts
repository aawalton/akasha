import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const furyOfSkies = {
  id: "01a0b70a-8e33-7196-b9b4-50fc5a728033",
  type: "page-type/world-character",
  slug: "fury-of-skies",
  title: "Fury of Skies",
  world: "world/the-wandering-inn",
  firstChapter: 402,
  lastChapter: 402,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

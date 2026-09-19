import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const voloke = {
  id: "01a0b70d-9709-7511-895e-0e79cdf8332e",
  type: "page-type/world-character",
  slug: "voloke",
  title: "Voloke",
  world: "world/the-wandering-inn",
  firstChapter: 608,
  lastChapter: 608,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

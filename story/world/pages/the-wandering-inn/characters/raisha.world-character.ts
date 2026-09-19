import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const raisha = {
  id: "01a0b70c-8660-736d-9094-1eb85272b6d4",
  type: "page-type/world-character",
  slug: "raisha",
  title: "Raisha",
  world: "world/the-wandering-inn",
  firstChapter: 169,
  lastChapter: 169,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

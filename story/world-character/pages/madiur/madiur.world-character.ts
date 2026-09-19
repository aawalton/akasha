import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const madiur = {
  id: "01a0b70b-9596-768e-b851-2d0d0a555c56",
  type: "page-type/world-character",
  slug: "madiur",
  title: "Madiur",
  world: "world/the-wandering-inn",
  firstChapter: 568,
  lastChapter: 568,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

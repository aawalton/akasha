import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const raeh = {
  id: "01a0b70c-7f4d-70ef-bbfc-cf60f3ba28c1",
  type: "page-type/world-character",
  slug: "raeh",
  title: "Raeh",
  world: "world/the-wandering-inn",
  firstChapter: 195,
  lastChapter: 195,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

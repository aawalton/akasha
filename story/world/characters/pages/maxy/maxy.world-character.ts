import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const maxy = {
  id: "01a0b70b-e3ac-76c5-b93e-6f7c82a207a2",
  type: "page-type/world-character",
  slug: "maxy",
  title: "Maxy",
  world: "world/the-wandering-inn",
  firstChapter: 686,
  lastChapter: 686,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

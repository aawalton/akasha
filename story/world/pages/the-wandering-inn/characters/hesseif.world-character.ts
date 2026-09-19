import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const hesseif = {
  id: "01a0b70a-f9eb-773d-8906-d72f0cfd7379",
  type: "page-type/world-character",
  slug: "hesseif",
  title: "Hesseif",
  world: "world/the-wandering-inn",
  firstChapter: 324,
  lastChapter: 324,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

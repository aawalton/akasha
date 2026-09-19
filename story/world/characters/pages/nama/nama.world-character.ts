import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nama = {
  id: "01a0b70c-004f-79e6-a492-a33d0f2d2742",
  type: "page-type/world-character",
  slug: "nama",
  title: "Nama",
  world: "world/the-wandering-inn",
  firstChapter: 477,
  lastChapter: 724,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

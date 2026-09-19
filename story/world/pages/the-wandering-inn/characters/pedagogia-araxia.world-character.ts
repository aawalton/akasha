import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pedagogiaAraxia = {
  id: "01a0b70c-25c3-75fd-bd33-df1ffef0c3d5",
  type: "page-type/world-character",
  slug: "pedagogia-araxia",
  title: "Pedagogia Araxia",
  world: "world/the-wandering-inn",
  firstChapter: 734,
  lastChapter: 735,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

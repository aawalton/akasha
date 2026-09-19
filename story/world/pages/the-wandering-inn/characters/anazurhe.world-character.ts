import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const anazurhe = {
  id: "01a0b707-6de0-75cf-ae67-394e1c417738",
  type: "page-type/world-character",
  slug: "anazurhe",
  title: "Anazurhe",
  world: "world/the-wandering-inn",
  firstChapter: 539,
  lastChapter: 718,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

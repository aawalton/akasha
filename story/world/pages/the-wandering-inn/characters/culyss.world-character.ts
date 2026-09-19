import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const culyss = {
  id: "01a0b70a-0caa-7b91-98ff-2f891aafd86b",
  type: "page-type/world-character",
  slug: "culyss",
  title: "Culyss",
  world: "world/the-wandering-inn",
  firstChapter: 84,
  lastChapter: 84,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

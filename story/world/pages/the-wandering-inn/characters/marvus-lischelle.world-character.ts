import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const marvusLischelle = {
  id: "01a0b70b-9d68-7557-b17d-5f5e3d9dfd28",
  type: "page-type/world-character",
  slug: "marvus-lischelle",
  title: "Marvus Lischelle",
  world: "world/the-wandering-inn",
  firstChapter: 819,
  lastChapter: 819,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

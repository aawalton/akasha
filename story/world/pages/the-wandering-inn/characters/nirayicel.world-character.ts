import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nirayicel = {
  id: "01a0b70c-09d4-7c81-8b8a-8439a30efac6",
  type: "page-type/world-character",
  slug: "nirayicel",
  title: "Nirayicel",
  world: "world/the-wandering-inn",
  firstChapter: 583,
  lastChapter: 583,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

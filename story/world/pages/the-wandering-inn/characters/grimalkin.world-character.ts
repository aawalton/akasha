import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const grimalkin = {
  id: "01a0b70a-ec29-7860-b153-fc9044e792ef",
  type: "page-type/world-character",
  slug: "grimalkin",
  title: "Grimalkin",
  world: "world/the-wandering-inn",
  firstChapter: 320,
  lastChapter: 804,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

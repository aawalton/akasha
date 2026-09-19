import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const knightCommanderCalirn = {
  id: "01a0b70b-6e68-76ac-aa06-ed8280469fa2",
  type: "page-type/world-character",
  slug: "knight-commander-calirn",
  title: "Calirn",
  world: "world/the-wandering-inn",
  firstChapter: 360,
  lastChapter: 490,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

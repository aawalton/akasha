import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const wiskeriaWitch = {
  id: "01a0b70d-9f8c-77d1-8c01-3d492637b87b",
  type: "page-type/world-character",
  slug: "wiskeria-witch",
  title: "Wiskeria",
  world: "world/the-wandering-inn",
  firstChapter: 519,
  lastChapter: 519,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lehraRuinstrider = {
  id: "01a0b70b-7fab-7def-8b70-4088e10344a3",
  type: "page-type/world-character",
  slug: "lehra-ruinstrider",
  title: "Lehra Ruinstrider",
  world: "world/the-wandering-inn",
  firstChapter: 470,
  lastChapter: 586,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

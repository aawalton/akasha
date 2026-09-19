import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const erinSolstice = {
  id: "01a0b705-e78c-77bf-8ab2-eb428dbcf7d6",
  type: "page-type/world-character",
  slug: "erin-solstice",
  title: "Erin Solstice",
  world: "world/the-wandering-inn",
  firstChapter: 1,
  lastChapter: 816,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const aaronVanwell = {
  id: "01a0b707-5f72-75e2-bf4a-32808b7e3485",
  type: "page-type/world-character",
  slug: "aaron-vanwell",
  title: "Aaron Vanwell",
  world: "world/the-wandering-inn",
  firstChapter: 275,
  lastChapter: 652,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

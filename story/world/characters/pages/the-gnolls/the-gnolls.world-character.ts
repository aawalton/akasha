import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theGnolls = {
  id: "01a0b70d-1d96-74d9-be08-3a76f72d382e",
  type: "page-type/world-character",
  slug: "the-gnolls",
  title: "Gnolls",
  world: "world/the-wandering-inn",
  firstChapter: 683,
  lastChapter: 683,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

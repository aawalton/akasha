import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const honoredBerr = {
  id: "01a0b70a-ffd6-758b-b965-d98431c188ed",
  type: "page-type/world-character",
  slug: "honored-berr",
  title: "Berr",
  world: "world/the-wandering-inn",
  firstChapter: 520,
  lastChapter: 520,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

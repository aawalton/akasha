import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const vulielDraeTeam = {
  id: "01a0b70d-982d-7aab-aea6-9e861d35ace1",
  type: "page-type/world-character",
  slug: "vuliel-drae-team",
  title: "Vuliel Drae",
  world: "world/the-wandering-inn",
  firstChapter: 255,
  lastChapter: 255,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

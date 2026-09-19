import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const treyAtwood = {
  id: "01a06580-2495-7f83-87b5-ff73ca63153c",
  type: "page-type/world-character",
  slug: "trey-atwood",
  title: "Trey Atwood",
  world: "world/the-wandering-inn",
  maxLevel: 20,
  eventCount: 15,
  firstChapter: 323,
  lastChapter: 704,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const xesci = {
  id: "01a0b70d-a317-7bff-bb57-2f41cd958601",
  type: "page-type/world-character",
  slug: "xesci",
  title: "Xesci",
  world: "world/the-wandering-inn",
  firstChapter: 489,
  lastChapter: 822,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

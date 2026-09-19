import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const marsTheIllusionist = {
  id: "01a0b70b-9d2f-7065-a602-d51efa7df0b3",
  type: "page-type/world-character",
  slug: "mars-the-illusionist",
  title: "Mars",
  world: "world/the-wandering-inn",
  firstChapter: 440,
  lastChapter: 440,
  characterClaims: "jsonl",
  aliasOf: "world-character/mars",
} as const satisfies WorldCharacter

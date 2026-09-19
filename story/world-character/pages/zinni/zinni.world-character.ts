import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zinni = {
  id: "01a0b70d-eec5-74e9-9dfe-8528fdc5623d",
  type: "page-type/world-character",
  slug: "zinni",
  title: "Zinni",
  world: "world/the-wandering-inn",
  firstChapter: 767,
  lastChapter: 767,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

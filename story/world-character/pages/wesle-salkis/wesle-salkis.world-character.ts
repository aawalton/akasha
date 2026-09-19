import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const wesleSalkis = {
  id: "01a0b70d-9d03-71c8-bd49-63310ddad329",
  type: "page-type/world-character",
  slug: "wesle-salkis",
  title: "Wesle",
  world: "world/the-wandering-inn",
  firstChapter: 244,
  lastChapter: 382,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

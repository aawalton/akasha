import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const bevussa = {
  id: "01a0b707-839b-70bc-8d5d-320319a9406a",
  type: "page-type/world-character",
  slug: "bevussa",
  title: "Bevussa",
  world: "world/the-wandering-inn",
  firstChapter: 282,
  lastChapter: 644,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

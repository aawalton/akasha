import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const greydath = {
  id: "01a0b70a-eab2-7a7b-a541-f0d3c9f0fb7a",
  type: "page-type/world-character",
  slug: "greydath",
  title: "Greybeard",
  world: "world/the-wandering-inn",
  firstChapter: 225,
  lastChapter: 686,
  characterClaims: "jsonl",
  aliasOf: "world-character/greydath-of-blades",
} as const satisfies WorldCharacter

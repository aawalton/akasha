import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ielane = {
  id: "01a0b70b-0423-72bd-a0aa-d387b5bf672c",
  type: "page-type/world-character",
  slug: "ielane",
  title: "Queen Ielane du Marquin",
  world: "world/the-wandering-inn",
  firstChapter: 608,
  lastChapter: 609,
  characterClaims: "jsonl",
  aliasOf: "world-character/ielane-du-marquin",
} as const satisfies WorldCharacter

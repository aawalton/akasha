import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const jerci = {
  id: "01a0b70b-1ec2-7c17-aec3-68b143e44ab6",
  type: "page-type/world-character",
  slug: "jerci",
  title: "Jerci",
  world: "world/the-wandering-inn",
  firstChapter: 379,
  lastChapter: 379,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

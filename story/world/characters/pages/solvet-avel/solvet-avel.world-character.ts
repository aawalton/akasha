import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const solvetAvel = {
  id: "01a0b70d-08ea-76e9-b87f-d49bc3f6a403",
  type: "page-type/world-character",
  slug: "solvet-avel",
  title: "Lord Solvet",
  world: "world/the-wandering-inn",
  firstChapter: 519,
  lastChapter: 519,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

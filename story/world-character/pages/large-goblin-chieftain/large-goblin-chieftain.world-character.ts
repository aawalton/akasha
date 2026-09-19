import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const largeGoblinChieftain = {
  id: "01a0b70b-7b56-7199-b852-8318de8ea5e6",
  type: "page-type/world-character",
  slug: "large-goblin-chieftain",
  title: "the large Goblin",
  world: "world/the-wandering-inn",
  firstChapter: 55,
  lastChapter: 55,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

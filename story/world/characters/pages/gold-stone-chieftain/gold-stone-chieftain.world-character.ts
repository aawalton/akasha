import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const goldStoneChieftain = {
  id: "01a0b70a-e56f-72d0-9c3c-eb2eee62b833",
  type: "page-type/world-character",
  slug: "gold-stone-chieftain",
  title: "Gold Stone Chieftain",
  world: "world/the-wandering-inn",
  firstChapter: 99,
  lastChapter: 154,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

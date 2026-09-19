import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ireil = {
  id: "01a06580-2494-7064-908a-82ecb3940fc1",
  type: "page-type/world-character",
  slug: "ireil",
  title: "Ireil",
  world: "world/the-wandering-inn",
  maxLevel: 5,
  eventCount: 7,
  firstChapter: 674,
  lastChapter: 674,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

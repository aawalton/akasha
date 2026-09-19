import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const warmageThresk = {
  id: "01a0b70d-99ff-7be3-9309-886b25fa1316",
  type: "page-type/world-character",
  slug: "warmage-thresk",
  title: "Warmage Thresk",
  world: "world/the-wandering-inn",
  firstChapter: 133,
  lastChapter: 133,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

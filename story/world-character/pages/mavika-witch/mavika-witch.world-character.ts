import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const mavikaWitch = {
  id: "01a0b70b-dfa5-7098-ba7d-8ef604e84918",
  type: "page-type/world-character",
  slug: "mavika-witch",
  title: "Mavika",
  world: "world/the-wandering-inn",
  firstChapter: 395,
  lastChapter: 395,
  characterClaims: "jsonl",
  aliasOf: "world-character/mavika",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const merish = {
  id: "01a0b70b-e965-71da-9697-a46e33c53c86",
  type: "page-type/world-character",
  slug: "merish",
  title: "Chief Warrior Merish",
  world: "world/the-wandering-inn",
  firstChapter: 438,
  lastChapter: 566,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

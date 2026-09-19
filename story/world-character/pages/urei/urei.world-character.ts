import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const urei = {
  id: "01a0b70d-8217-74fc-9d64-4efa82a34751",
  type: "page-type/world-character",
  slug: "urei",
  title: "Urei",
  world: "world/the-wandering-inn",
  firstChapter: 720,
  lastChapter: 720,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

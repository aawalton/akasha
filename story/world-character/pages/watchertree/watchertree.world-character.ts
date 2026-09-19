import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const watchertree = {
  id: "01a0b70d-9b63-7c96-a243-5e5882e67c54",
  type: "page-type/world-character",
  slug: "watchertree",
  title: "the Watchertree",
  world: "world/the-wandering-inn",
  firstChapter: 373,
  lastChapter: 373,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

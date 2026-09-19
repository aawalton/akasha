import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const terigrals = {
  id: "01a0b70d-1894-78ff-a24d-d38952bf5071",
  type: "page-type/world-character",
  slug: "terigrals",
  title: "Terigrals",
  world: "world/the-wandering-inn",
  firstChapter: 510,
  lastChapter: 510,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

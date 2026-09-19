import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const revineZecrew = {
  id: "01a0b70c-9387-73fd-8c7b-ba4e4bc21e65",
  type: "page-type/world-character",
  slug: "revine-zecrew",
  title: "Revine Zecrew",
  world: "world/the-wandering-inn",
  firstChapter: 548,
  lastChapter: 554,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

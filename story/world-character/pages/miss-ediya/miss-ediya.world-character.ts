import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const missEdiya = {
  id: "01a0b70b-efdf-7717-933f-7588b2fbabb0",
  type: "page-type/world-character",
  slug: "miss-ediya",
  title: "Ediya",
  world: "world/the-wandering-inn",
  firstChapter: 388,
  lastChapter: 388,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kasigna = {
  id: "01a0b70b-23a4-7d17-b343-36f557746642",
  type: "page-type/world-character",
  slug: "kasigna",
  title: "the three women in one",
  world: "world/the-wandering-inn",
  firstChapter: 495,
  lastChapter: 758,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const exara = {
  id: "01a0b70a-7639-7243-9bb9-45597a7181c2",
  type: "page-type/world-character",
  slug: "exara",
  title: "Exara",
  world: "world/the-wandering-inn",
  firstChapter: 195,
  lastChapter: 199,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

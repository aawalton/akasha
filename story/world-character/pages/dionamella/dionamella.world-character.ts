import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dionamella = {
  id: "01a0b70a-19a4-7f55-adb5-8b322391c805",
  type: "page-type/world-character",
  slug: "dionamella",
  title: "Dionamella",
  world: "world/the-wandering-inn",
  firstChapter: 567,
  lastChapter: 572,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

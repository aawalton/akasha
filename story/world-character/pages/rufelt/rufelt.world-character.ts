import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rufelt = {
  id: "01a0b70c-a031-76ce-bcc3-cd1170865113",
  type: "page-type/world-character",
  slug: "rufelt",
  title: "Rufelt",
  world: "world/the-wandering-inn",
  firstChapter: 320,
  lastChapter: 644,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

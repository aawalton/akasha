import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const serept = {
  id: "01a0b70c-f80f-76b2-8391-4f5faf91578d",
  type: "page-type/world-character",
  slug: "serept",
  title: "Serept",
  world: "world/the-wandering-inn",
  firstChapter: 581,
  lastChapter: 581,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const humricMames = {
  id: "01a0b70b-02f2-7db1-9bcc-16298d45a69b",
  type: "page-type/world-character",
  slug: "humric-mames",
  title: "Humric Mames",
  world: "world/the-wandering-inn",
  firstChapter: 328,
  lastChapter: 328,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const qum = {
  id: "01a0b70c-7c9f-78b1-a692-a03a06972abd",
  type: "page-type/world-character",
  slug: "qum",
  title: "Qum",
  world: "world/the-wandering-inn",
  firstChapter: 163,
  lastChapter: 163,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const wardenJespeire = {
  id: "01a0b70d-99c2-799f-9075-5150f8a5abd7",
  type: "page-type/world-character",
  slug: "warden-jespeire",
  title: "Warden Jespeire",
  world: "world/the-wandering-inn",
  firstChapter: 691,
  lastChapter: 691,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const asgra = {
  id: "01a0b707-74c2-7071-b608-91e84171ca4c",
  type: "page-type/world-character",
  slug: "asgra",
  title: "Asgra",
  world: "world/the-wandering-inn",
  firstChapter: 728,
  lastChapter: 817,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

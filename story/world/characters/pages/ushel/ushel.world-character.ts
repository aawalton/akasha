import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ushel = {
  id: "01a0b70d-82fb-791f-9324-95b8bf65c8e1",
  type: "page-type/world-character",
  slug: "ushel",
  title: "Ushel",
  world: "world/the-wandering-inn",
  firstChapter: 403,
  lastChapter: 403,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

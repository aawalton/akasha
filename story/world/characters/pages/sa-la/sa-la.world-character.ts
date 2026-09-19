import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const saLa = {
  id: "01a0b70c-a62d-7fdc-ab22-9273874e353d",
  type: "page-type/world-character",
  slug: "sa-la",
  title: "Sa'la",
  world: "world/the-wandering-inn",
  firstChapter: 556,
  lastChapter: 556,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

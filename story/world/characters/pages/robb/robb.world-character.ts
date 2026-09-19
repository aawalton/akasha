import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const robb = {
  id: "01a0b70c-9b97-7338-828d-37337e52b02b",
  type: "page-type/world-character",
  slug: "robb",
  title: "Robb",
  world: "world/the-wandering-inn",
  firstChapter: 779,
  lastChapter: 779,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

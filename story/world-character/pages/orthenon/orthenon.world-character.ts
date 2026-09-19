import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const orthenon = {
  id: "01a0b70c-1c45-71e6-a6c4-728c617a4e68",
  type: "page-type/world-character",
  slug: "orthenon",
  title: "Orthenon",
  world: "world/the-wandering-inn",
  firstChapter: 27,
  lastChapter: 704,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ressk = {
  id: "01a0b70c-9134-71c7-b4b0-49f6dfca4f81",
  type: "page-type/world-character",
  slug: "ressk",
  title: "Ressk",
  world: "world/the-wandering-inn",
  firstChapter: 617,
  lastChapter: 618,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tyrionVeltras = {
  id: "01a0b70d-7b2b-72c5-a32c-5e4edc8e22ce",
  type: "page-type/world-character",
  slug: "tyrion-veltras",
  title: "Tyrion Veltras",
  world: "world/the-wandering-inn",
  firstChapter: 236,
  lastChapter: 752,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

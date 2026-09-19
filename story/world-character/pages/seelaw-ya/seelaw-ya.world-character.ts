import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const seelawYa = {
  id: "01a0b70c-efc2-759d-a11c-22c9b924747a",
  type: "page-type/world-character",
  slug: "seelaw-ya",
  title: "the leader",
  world: "world/the-wandering-inn",
  firstChapter: 541,
  lastChapter: 541,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

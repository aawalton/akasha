import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const worker = {
  id: "01a0b70d-a069-79ab-8776-49fb91184ffa",
  type: "page-type/world-character",
  slug: "worker",
  title: "Worker",
  world: "world/the-wandering-inn",
  firstChapter: 28,
  lastChapter: 352,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

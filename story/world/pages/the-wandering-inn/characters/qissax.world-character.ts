import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const qissax = {
  id: "01a0b70c-780d-7269-bc5c-2370c52e0ffc",
  type: "page-type/world-character",
  slug: "qissax",
  title: "Qissax",
  world: "world/the-wandering-inn",
  firstChapter: 823,
  lastChapter: 823,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

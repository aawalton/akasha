import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const masterOfArmsGiqe = {
  id: "01a0b70b-9e4b-7505-ae71-fd9d658007c5",
  type: "page-type/world-character",
  slug: "master-of-arms-giqe",
  title: "Giqe",
  world: "world/the-wandering-inn",
  firstChapter: 646,
  lastChapter: 646,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

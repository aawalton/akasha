import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mivifa = {
  id: "01a0b70b-f0c5-7c16-a6c6-8bcda157565c",
  type: "page-type/world-character",
  slug: "mivifa",
  title: "Mivifa",
  world: "world/the-wandering-inn",
  firstChapter: 464,
  lastChapter: 794,
  characterClaims: "jsonl",
  aliasOf: "world-character/mivifa-selifscale",
} as const satisfies WorldCharacter

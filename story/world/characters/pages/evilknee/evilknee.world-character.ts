import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const evilknee = {
  id: "01a0b70a-75cd-7214-94cf-5ebeff2892af",
  type: "page-type/world-character",
  slug: "evilknee",
  title: "Evilknee",
  world: "world/the-wandering-inn",
  firstChapter: 717,
  lastChapter: 717,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

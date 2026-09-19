import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const eschowar = {
  id: "01a0b70a-7369-709a-9191-dad9dc27d28d",
  type: "page-type/world-character",
  slug: "eschowar",
  title: "Eschowar",
  world: "world/the-wandering-inn",
  firstChapter: 663,
  lastChapter: 824,
  characterClaims: "jsonl",
  aliasOf: "world-character/eschowar-erchirite",
} as const satisfies WorldCharacter

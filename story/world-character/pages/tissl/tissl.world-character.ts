import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tissl = {
  id: "01a0b70d-651b-731f-b8f6-8038d80eb7ce",
  type: "page-type/world-character",
  slug: "tissl",
  title: "Tissl Venleather",
  world: "world/the-wandering-inn",
  firstChapter: 786,
  lastChapter: 810,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

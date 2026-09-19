import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const nerul = {
  id: "01a0b70c-0610-7034-af61-99346995d787",
  type: "page-type/world-character",
  slug: "nerul",
  title: "Nerul Gemscale",
  world: "world/the-wandering-inn",
  firstChapter: 489,
  lastChapter: 664,
  characterClaims: "jsonl",
  aliasOf: "world-character/nerul-gemscale",
} as const satisfies WorldCharacter

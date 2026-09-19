import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const domehead = {
  id: "01a0b70a-1a76-70b4-af55-32158472247c",
  type: "page-type/world-character",
  slug: "domehead",
  title: "Domehead",
  world: "world/the-wandering-inn",
  firstChapter: 528,
  lastChapter: 542,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

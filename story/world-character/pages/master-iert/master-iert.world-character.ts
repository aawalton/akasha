import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const masterIert = {
  id: "01a0b70b-9ddb-7fc5-8f7f-da7269909f0d",
  type: "page-type/world-character",
  slug: "master-iert",
  title: "Iert",
  world: "world/the-wandering-inn",
  firstChapter: 682,
  lastChapter: 682,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const masterOidhol = {
  id: "01a0b70b-9e83-7d66-b2ef-316220ed527e",
  type: "page-type/world-character",
  slug: "master-oidhol",
  title: "Master Oidhol",
  world: "world/the-wandering-inn",
  firstChapter: 824,
  lastChapter: 824,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const garenRedFang = {
  id: "01a0b70a-9108-7da1-a842-1379c20ceedf",
  type: "page-type/world-character",
  slug: "garen-red-fang",
  title: "Garen Red Fang",
  world: "world/the-wandering-inn",
  firstChapter: 108,
  lastChapter: 111,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

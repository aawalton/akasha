import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hisaille = {
  id: "01a0b70a-fe48-702c-9df8-88684408b74e",
  type: "page-type/world-character",
  slug: "hisaille",
  title: "Hisaille",
  world: "world/the-wandering-inn",
  firstChapter: 514,
  lastChapter: 514,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

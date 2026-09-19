import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const xrnSmallQueen = {
  id: "01a0b70d-d8c6-786f-9251-ffe57c3ceb75",
  type: "page-type/world-character",
  slug: "xrn-small-queen",
  title: "Xrn",
  world: "world/the-wandering-inn",
  firstChapter: 113,
  lastChapter: 715,
  characterClaims: "jsonl",
  aliasOf: "world-character/xrn",
} as const satisfies WorldCharacter

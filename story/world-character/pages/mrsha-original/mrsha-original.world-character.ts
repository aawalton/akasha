import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const mrshaOriginal = {
  id: "01a0b70b-fb55-770b-a0e6-e78e7376a568",
  type: "page-type/world-character",
  slug: "mrsha-original",
  title: "Mrsha du Marquin",
  world: "world/the-wandering-inn",
  firstChapter: 762,
  lastChapter: 762,
  characterClaims: "jsonl",
  aliasOf: "world-character/mrsha",
} as const satisfies WorldCharacter

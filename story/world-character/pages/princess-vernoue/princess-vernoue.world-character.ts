import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const princessVernoue = {
  id: "01a0b70c-7574-7f7f-a0eb-73ac3b46170e",
  type: "page-type/world-character",
  slug: "princess-vernoue",
  title: "Princess Vernoue",
  world: "world/the-wandering-inn",
  firstChapter: 572,
  lastChapter: 572,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

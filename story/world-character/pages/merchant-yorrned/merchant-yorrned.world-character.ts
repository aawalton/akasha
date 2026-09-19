import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const merchantYorrned = {
  id: "01a0b70b-e80b-7c4b-8272-f966279cfca5",
  type: "page-type/world-character",
  slug: "merchant-yorrned",
  title: "Merchant Yorrned",
  world: "world/the-wandering-inn",
  firstChapter: 691,
  lastChapter: 691,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

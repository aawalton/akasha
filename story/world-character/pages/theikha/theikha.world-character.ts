import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const theikha = {
  id: "01a0b70d-2272-7861-8d57-8db416ca4626",
  type: "page-type/world-character",
  slug: "theikha",
  title: "Theikha",
  world: "world/the-wandering-inn",
  firstChapter: 564,
  lastChapter: 711,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

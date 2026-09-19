import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const jiltaReceptionist = {
  id: "01a0b70b-2011-7f9c-837b-59f38404818d",
  type: "page-type/world-character",
  slug: "jilta-receptionist",
  title: "Jilta",
  world: "world/the-wandering-inn",
  firstChapter: 349,
  lastChapter: 349,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

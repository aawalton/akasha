import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const liuss = {
  id: "01a0b70b-87d7-7602-8e84-cb3088514902",
  type: "page-type/world-character",
  slug: "liuss",
  title: "Gem Officer Liuss",
  world: "world/the-wandering-inn",
  firstChapter: 819,
  lastChapter: 819,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
